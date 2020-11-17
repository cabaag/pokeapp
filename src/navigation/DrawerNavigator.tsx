import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { enableScreens } from 'react-native-screens';
import MainScreen from '../screens/MainScreen/MainScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

enableScreens();
const Drawer = createDrawerNavigator();

// eslint-disable-next-line react/display-name
const LogoTitle = memo(() => (
  <Image
    source={require('../assets/images/pokemon.png')}
    style={{ width: 140, height: 50 }}
  />
))

export default function DrawerNavigator(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Drawer.Navigator
      initialRouteName="Pomemons"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3F51B5',
        },
        headerTintColor: '#fff',
        // eslint-disable-next-line react/display-name
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen component={MainScreen} name="Pokemons" />
      <Drawer.Screen component={MainScreen} name={t('berries')} />
      <Drawer.Screen component={SettingsScreen} name={t('settings')} />
    </Drawer.Navigator>

  );
}

