import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Cejas y Uñas' }}
      />
    </Stack>
  );
};

export default RootLayout;
