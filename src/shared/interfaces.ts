interface PokemonBasic {
  name: string;
}

interface PokemonList extends PokemonBasic {
  url: string;
}

export type { PokemonBasic, PokemonList };
