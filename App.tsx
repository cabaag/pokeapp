import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import './src/utils/i18n';

export default function App(): React.ReactElement | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      {/* <StatusBar /> */}
    </SafeAreaProvider>
  );
}
