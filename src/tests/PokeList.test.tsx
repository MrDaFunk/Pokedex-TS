import { describe, test, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import PokeList from "../components/PokeList";

describe("PokeList", () => {
  beforeAll(() => {
    render(<PokeList />);
  });

  test.each([
    { name: "bulbasaur" },
    { name: "charmander" },
    { name: "squirtle" },
  ])("Displays pokemon $name", async ({ name }) => {
    expect(
      await screen.findByText(new RegExp(name, "i"), {}, { timeout: 3000 })
    ).toBeDefined();
  });

  test.each([{ name: "grass" }, { name: "fire" }, { name: "water" }])(
    "Displays type $name",
    async ({ name }) => {
      expect(
        await screen.findAllByText(new RegExp(name, "i"), {}, { timeout: 3000 })
      ).toBeDefined();
    }
  );
});
