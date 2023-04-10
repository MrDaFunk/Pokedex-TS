import { useEffect, useState, Suspense, FC } from "react";

import Loading from "./Loading";

interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

interface Pokemon {
  front_default: string;
  front_shiny: string;
  types: PokemonType[];
}

interface Pokemons {
  name: string;
  url: string;
}

const PokeCard: FC<Pokemons> = ({ name, url }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  useEffect(() => {
    (async () => {
      const {
        sprites: { front_default, front_shiny },
        types,
      } = await (await fetch(url)).json();
      setPokemon({ front_default, front_shiny, types });
    })();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      {pokemon && (
        <div className={`PokeCard ${pokemon.types[0].type.name}`}>
          {name}
          <img
            src={pokemon.front_default}
            onMouseOver={(e) => (e.currentTarget.src = pokemon.front_shiny)}
            onMouseOut={(e) => (e.currentTarget.src = pokemon.front_default)}
          />
          {pokemon.types.map(({ type: { name } }) => name).join(", ")}
        </div>
      )}
    </Suspense>
  );
};

export default PokeCard;
