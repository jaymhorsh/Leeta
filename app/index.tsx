import { Animated, Text, TouchableOpacity, View, StatusBar, ActivityIndicator } from 'react-native';
import { useWelcomeAnimation } from '@/hooks/useSplashAnimations';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const { logoScale, textOpacity, buttonTranslateY, buttonOpacity, backgroundColor } = useWelcomeAnimation();

  const handleGetStarted = () => {
    router.push('/(auth)/signup/Step1Goal');
  };
  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Animated.View className="flex-1 items-center justify-between px-6 py-12" style={{ backgroundColor }}>
        <View className="flex-1 items-center justify-center">
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            className="w-40 h-40 mb-8"
            style={{ transform: [{ scale: logoScale }] }}
            resizeMode="contain"
          />

          <Animated.Text className="text-3xl font-matterBold text-brand-text mb-3 text-center" style={{ opacity: textOpacity }}>
            Safer and Convenient
          </Animated.Text>

          <Animated.Text className="text-base text-gray-600 text-center max-w-[280px] font-matter" style={{ opacity: textOpacity }}>
            Order from anywhere, anytime. Fast, safe, and reliable.
          </Animated.Text>
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          }}
          className="w-full"
        >
          <TouchableOpacity onPress={handleGetStarted} className="bg-brand-primary px-10 py-4 rounded-full active:opacity-90 mb-4">
            <Text className="text-white font-matterSemiBold text-center text-base">Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignIn} className="py-3">
            <Text className="text-brand-text font-matter text-center text-base">
              Already have an account? <Text className="font-matterSemiBold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
