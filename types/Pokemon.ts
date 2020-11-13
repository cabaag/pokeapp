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
  front_default: 'string';
  front_shiny: 'string';
  front_female: 'string';
  front_shiny_female: 'string';
  back_default: 'string';
  back_shiny: 'string';
  back_female: 'string';
  back_shiny_female: 'string';
};

export type Pokemon = {
  name: string;
  url?: string;
  id?: number;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
};
