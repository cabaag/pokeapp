export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url?: string;
  }[];
};

export type PokemonSprites = {
  front_default: string;
  front_shiny: string;
};

export type PokemonStat = {
  stat: {
    name: string;
    url: string;
  };
  effort: number;
  base_stat: number;
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
};
