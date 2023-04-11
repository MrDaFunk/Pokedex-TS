import { describe, test, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import PokeCard from "../components/PokeCard";
import usePokemon from "../hooks/usePokemon";

vi.mock("../hooks/usePokemon");

const BULBASAUR = "bulbasaur";

const API = `${
  import.meta.env.REACT_APP_API ?? "https://pokeapi.co/api/v2/"
}pokemon/${BULBASAUR}`;

const mockSchedule = {
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_shiny: "",
  },
  types: [{ type: { name: "grass" } }],
};
describe("PokeCard", () => {
  beforeAll(() => {
    usePokemon.mockReturnValue([mockSchedule, false, null]);
    render(<PokeCard name={BULBASAUR} url={API} />);
  });

  test.each([{ name: BULBASAUR }, { name: "grass" }])(
    "Displays pokemon information $name",
    async ({ name }) => {
      expect(await screen.findByText(new RegExp(name, "i"))).toBeDefined();
    }
  );
});
