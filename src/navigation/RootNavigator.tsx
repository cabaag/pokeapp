import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { RootStackParamList } from '../types/Stacks';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3F51B5',
        },
        headerTintColor: '#fff',
        headerTranslucent: true,
        title: '',
        replaceAnimation: 'push',
      }}
    >
      <Stack.Screen
        component={DrawerNavigator}
        name="Drawer"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen component={PokemonDetailsScreen} name="PokemonDetailsScreen" />
    </Stack.Navigator>
  )
}


export default RootNavigator;