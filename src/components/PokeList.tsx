import { Suspense, FC } from "react";
import styled from "@emotion/styled";

import usePokemon from "../hooks/usePokemon";
import { PokemonList } from "../shared/interfaces";

import Loading from "./Loading";
import PokeCard from "./PokeCard";

interface PokemonAPIList {
  results: PokemonList[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PokeList: FC = () => {
  const [pokemons] = usePokemon<PokemonAPIList>();
  if (!pokemons) {
    return null;
  }
  const { results } = pokemons;
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        {results.map(({ name, url }) => (
          <PokeCard key={name} name={name} url={url} />
        ))}
      </Suspense>
    </Container>
  );
};

export default PokeList;
