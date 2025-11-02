import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
  );
}
