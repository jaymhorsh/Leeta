import '@/styles/global.css';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppStateStatus, AppState, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '@/utils/reactQueryClient';
import { useAuthStore } from '@/store/authStore';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loadAuth } = useAuthStore();

  // Load auth state on app start
  useEffect(() => {
    loadAuth();
  }, []);

  const [loaded, error] = useFonts({
    'Matter-Regular': require('../assets/fonts/Matter-Regular.otf'),
    'Matter-Bold': require('../assets/fonts/Matter-Bold.otf'),
    'Matter-SemiBold': require('../assets/fonts/Matter-SemiBold.otf'),
    'Matter-Medium': require('../assets/fonts/Matter-Medium.otf'),
    'Matter-Light': require('../assets/fonts/Matter-Light.otf'),
    'Matter-Heavy': require('../assets/fonts/Matter-Heavy.otf'),
    'Matter-BoldItalic': require('../assets/fonts/Matter-BoldItalic.otf'),
    'Matter-HeavyItalic': require('../assets/fonts/Matter-HeavyItalic.otf'),
    'Matter-MediumItalic': require('../assets/fonts/Matter-MediumItalic.otf'),
    'Matter-SemiBoldItalic': require('../assets/fonts/Matter-SemiBoldItalic.otf'),
    'Matter-RegularItalic': require('../assets/fonts/Matter-RegularItalic.otf'),
    'Matter-LightItalic': require('../assets/fonts/Matter-LightItalic.otf'),
  });

  // Handle app state changes for React Query focus management
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (error) {
    console.error('Font loading error:', error);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NotifierWrapper>
          <ThemeProvider value={DefaultTheme}>
            <QueryClientProvider client={queryClient}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
                <Stack.Screen name="(screens)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" options={{ headerShown: false }} />
              </Stack>
            </QueryClientProvider>
            <StatusBar style="auto" />
          </ThemeProvider>
        </NotifierWrapper>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
