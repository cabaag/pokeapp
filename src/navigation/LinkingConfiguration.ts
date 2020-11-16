import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      MainScreen: 'main',
      PokemonDetailsScreen: 'pokemonDetails',
      SettingsScreen: 'settings',
      NotFoundScreen: '*',
    },
  },
};
