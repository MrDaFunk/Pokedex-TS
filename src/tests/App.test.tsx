import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../components/App";
import usePokemon from "../hooks/usePokemon";

vi.mock("../hooks/usePokemon");

const BULBASAUR = "bulbasaur";

const API = `${
  import.meta.env.REACT_APP_API ?? "https://pokeapi.co/api/v2/"
}pokemon/`;

const mockSchedule = {
  results: [
    {
      name: BULBASAUR,
      url: `${API}${BULBASAUR}`,
    },
  ],
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_shiny: "",
  },
  types: [{ type: { name: "grass" } }],
};
describe("App", () => {
  usePokemon.mockReturnValue([mockSchedule, false, null]);
  render(<App />);

  test.each([{ name: BULBASAUR }, { name: "grass" }])(
    "Displays pokemon $name",
    async ({ name }) => {
      expect(await screen.findByText(new RegExp(name, "i"))).toBeDefined();
    }
  );
});
