import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorDetail" />
      <Stack.Screen name="settings" />
      <StatusBar style="auto" />
    </Stack>
  );
}
