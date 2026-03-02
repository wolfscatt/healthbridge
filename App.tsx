import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/AppNavigation';
import { AppProvider } from './src/context/AppContext';
import { colors } from './src/theme/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}
