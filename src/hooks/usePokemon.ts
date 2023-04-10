import { useEffect, useState } from "react";

const API = `${
  import.meta.env.REACT_APP_API ?? "https://pokeapi.co/api/v2/"
}pokemon/?limit=250&offset=0`;

const usePokemon = <T>(
  { url = API } = {
    url: API,
  }
) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    (async () => {
      setData(await (await fetch(url)).json());
    })();
  }, []);
  return [data];
};

export default usePokemon;
