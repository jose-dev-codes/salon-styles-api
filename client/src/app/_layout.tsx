import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ title: 'Cejas y Uñas' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
