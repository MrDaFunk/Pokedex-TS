import { useEffect, useState, Suspense, FC } from "react";
import "./App.css";

import Loading from "./Loading";
import PokeCard from "./PokeCard";

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
    <Suspense fallback={<Loading />}>
      {pokemons.map(({ name, url }) => (
        <PokeCard key={name} name={name} url={url} />
      ))}
    </Suspense>
  );
};

export default App;
