import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import LogoTitle from '../components/LogoTitle/LogoTitle';
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
          blurEffect: "extraLight"
        },
        headerTintColor: '#fff',
        title: '',
        headerTopInsetEnabled: false,
        // eslint-disable-next-line react/display-name
        headerCenter: () => <LogoTitle />,
        replaceAnimation: 'push',
      }}
    >
      <Stack.Screen
        component={DrawerNavigator}
        name="Drawer"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={PokemonDetailsScreen}
        name="PokemonDetailsScreen"
      />
    </Stack.Navigator>
  )
}


export default RootNavigator;