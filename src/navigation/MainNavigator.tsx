import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import MainScreen from '../screens/MainScreen/MainScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { RootStackParamList } from '../types/Stacks';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
      }}

    >
      <Stack.Screen component={MainScreen} name="MainScreen" />
      <Stack.Screen component={PokemonDetailsScreen} name="PokemonDetailsScreen" />
    </Stack.Navigator>
  )
}


export default MainNavigator;