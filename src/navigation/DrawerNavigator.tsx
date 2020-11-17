import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { enableScreens } from 'react-native-screens';
import LogoTitle from '../components/LogoTitle/LogoTitle';
import MainScreen from '../screens/MainScreen/MainScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

enableScreens();
const Drawer = createDrawerNavigator();

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

