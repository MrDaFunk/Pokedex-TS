import { Suspense, FC } from "react";
import styled from "@emotion/styled";

import usePokemon from "../hooks/usePokemon";
import { PokemonBasic, PokemonList } from "../shared/interfaces";

import Loading from "./Loading";

interface PokeAPIType {
  type: {
    name: string;
  };
}

interface PokemonCall extends PokemonBasic {
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: PokeAPIType[];
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

const PokeCard: FC<PokemonList> = ({ name, url }) => {
  const [pokemon] = usePokemon<PokemonCall>({ url });
  if (!pokemon) {
    return null;
  }
  const {
    sprites: { front_default, front_shiny },
    types,
  } = pokemon;
  return (
    <Suspense fallback={<Loading />}>
      <Card className={types[0].type.name}>
        {name}
        <img
          src={front_default}
          onMouseOver={(e) => (e.currentTarget.src = front_shiny)}
          onMouseOut={(e) => (e.currentTarget.src = front_default)}
        />
        {types.map(({ type: { name: typeName } }) => typeName).join(", ")}
      </Card>
    </Suspense>
  );
};

export default PokeCard;
