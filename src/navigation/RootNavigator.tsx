import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainScreen from '../screens/MainScreen/MainScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { RootStackParamList } from '../types/Stacks';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#3F51B5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen component={MainScreen} name="MainScreen" />
      <Stack.Screen component={PokemonDetailsScreen} name="PokemonDetailsScreen" />
    </Stack.Navigator>
  );
}
