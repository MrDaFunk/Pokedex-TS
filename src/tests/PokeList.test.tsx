import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../components/App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  test.each([
    { name: "bulbasaur" },
    { name: "charmander" },
    { name: "squirtle" },
  ])("Displays pokemon $name", async ({ name }) => {
    expect(await screen.findByText(new RegExp(name, "i"))).toBeDefined();
  });

  test.each([{ name: "grass" }, { name: "fire" }, { name: "water" }])(
    "Displays type $name",
    async ({ name }) => {
      expect(await screen.findByText(new RegExp(name, "i"))).toBeDefined();
    }
  );
});
