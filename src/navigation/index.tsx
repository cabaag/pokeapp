import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import React from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';

type NavigationProps = {
  colorScheme: 'light' | 'dark'
}

export default function Navigation({ colorScheme }: NavigationProps): React.ReactElement {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
