import { Pokemon } from '../types/Pokemon';

const PokemonMock: Pokemon = {
  base_experience: 0,
  height: 10,
  weight: 10,
  name: 'test',
  sprites: {
    front_default: '',
    front_shiny: '',
  },
  stats: [
    {
      base_stat: 10,
      effort: 0,
      stat: {
        name: 'stat test',
        url: '',
      },
    },
  ],
  id: 0,
};

export { PokemonMock };
