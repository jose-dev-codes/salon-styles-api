import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  const [fuentesCargadas] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fuentesCargadas) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/*<StatusBar style="dark" />*/}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="index"
          options={{ title: 'Cejas y Uñas' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
