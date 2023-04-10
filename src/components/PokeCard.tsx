import { useEffect, useState, Suspense, FC } from "react";
import styled from "@emotion/styled";

import Loading from "./Loading";

interface PokemonType {
  name: string;
}

interface PokeAPIType {
  type: PokemonType;
}

interface PokemonBasic {
  name: string;
}

interface PokemonLoad extends PokemonBasic {
  url: string;
}

interface Pokemon extends PokemonBasic {
  front_default: string;
  front_shiny: string;
  types: PokemonType[];
}

const Card = styled.div`
  display: flex;
  height: 150px;
  width: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  margin: 0.2rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &.dragon,
  &.grass,
  &.poison,
  &.ground,
  &.fighting,
  &.psychic,
  &.dark {
    color: white;
  }
  &.grass {
    background-color: green;
  }
  &.bug {
    background-color: greenyellow;
  }
  &.water {
    background-color: aqua;
  }
  &.fire {
    background-color: salmon;
  }
  &.normal {
    background-color: lightgray;
  }
  &.poison {
    background-color: blueviolet;
  }
  &.electric {
    background-color: yellow;
  }
  &.ground {
    background-color: burlywood;
  }
  &.fairy {
    background-color: pink;
  }
  &.fighting {
    background-color: brown;
  }
  &.psychic {
    background-color: purple;
  }
  &.rock {
    background-color: saddlebrown;
  }
  &.ghost {
    background-color: plum;
  }
  &.ice {
    background-color: lightblue;
  }
  &.dragon {
    background-color: red;
  }
  &.dark {
    background-color: black;
  }
  &.steel {
    background-color: whitesmoke;
  }
`;

const PokeCard: FC<Pokemon> = ({ name, types, front_default, front_shiny }) => (
  <Card className={types[0].name}>
    {name}
    <img
      src={front_default}
      onMouseOver={(e) => (e.currentTarget.src = front_shiny)}
      onMouseOut={(e) => (e.currentTarget.src = front_default)}
    />
    {types.map(({ name: typeName }) => typeName).join(", ")}
  </Card>
);

const PokeLoad: FC<PokemonLoad> = ({ name, url }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  useEffect(() => {
    (async () => {
      const {
        sprites: { front_default, front_shiny },
        types,
      } = await (await fetch(url)).json();
      setPokemon({
        name,
        front_default,
        front_shiny,
        types: types.map(({ type }: PokeAPIType) => type),
      });
    })();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      {pokemon && <PokeCard {...pokemon} />}
    </Suspense>
  );
};

export default PokeLoad;
