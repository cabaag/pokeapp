import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { enableScreens } from 'react-native-screens';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import MainNavigator from './MainNavigator';

enableScreens();
const Drawer = createDrawerNavigator();

// eslint-disable-next-line react/display-name
const LogoTitle = memo(() => (
  <Image
    source={require('../assets/images/pokemon.png')}
    style={{ width: 140, height: 50 }}
  />
))

export default function RootNavigator(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Drawer.Navigator
      initialRouteName="MainNavigator"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3F51B5',
        },
        headerTintColor: '#fff',
        // eslint-disable-next-line react/display-name
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center'
      }}

    >
      <Drawer.Screen component={MainNavigator} name="Pokemons" />
      <Drawer.Screen component={MainNavigator} name={t('berries')} />
      <Drawer.Screen component={SettingsScreen} name={t('settings')} />
    </Drawer.Navigator>

  );
}

