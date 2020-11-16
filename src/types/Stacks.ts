import { Pokemon } from './Pokemon';

export type RootStackParamList = {
  MainScreen: undefined;
  PokemonDetailsScreen: { pokemon: Pokemon };
  SettingsScreen: undefined;
};
