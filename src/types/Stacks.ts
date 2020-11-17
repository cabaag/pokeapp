import { Pokemon } from './Pokemon';

export type RootStackParamList = {
  Drawer: undefined;
  MainScreen: undefined;
  PokemonDetailsScreen: { pokemon: Pokemon };
  SettingsScreen: undefined;
};
