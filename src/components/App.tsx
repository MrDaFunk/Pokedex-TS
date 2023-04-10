import { useEffect, useState, Suspense, FC } from "react";
import styled from "@emotion/styled";

import Loading from "./Loading";
import PokeCard from "./PokeCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const App: FC = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    if (pokemons.length === 0) {
      (async () => {
        const { results } = await (
          await fetch("https://pokeapi.co/api/v2/pokemon/?limit=250&offset=0")
        ).json();
        setPokemons(results);
      })();
    }
  }, []);
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        {pokemons.map(({ name, url }) => (
          <PokeCard key={name} name={name} url={url} />
        ))}
      </Suspense>
    </Container>
  );
};

export default App;
