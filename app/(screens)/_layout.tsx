import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ScreensLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VendorDetail" />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
