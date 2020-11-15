type NamedAPIResource = {
  name: string;
  url?: string;
};

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type PokemonSprites = {
  front_default: string;
  front_shiny: string;
};

export type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

export type Pokemon = {
  name: string;
  url?: string;
  id?: number;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};
