import { Animated, Text, BackHandler, TouchableOpacity, View, Alert } from 'react-native';
import { useWelcomeAnimation } from '@/hooks/useSplashAnimations';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();
  const { logoScale, textOpacity, buttonTranslateY, buttonOpacity, backgroundColor } = useWelcomeAnimation();

  // Check onboarding status
  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem('onboarded');
      if (onboarded === 'true') {
        setTimeout(() => {
          router.replace('/(dashboard)/home');
        }, 2000); // Show splash for 2 seconds then navigate
      }
    };

    checkOnboarding();
  }, [router]);

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
            style: 'destructive',
          },
        ],
        { cancelable: false },
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const handleGetStarted = () => {
    router.push('/(auth)/signup/Step1Goal');
  };

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <View className="flex-1 bg-[#213517] items-center justify-center">
      <Animated.View className="flex-1 items-center justify-center px-6" style={{ backgroundColor }}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          className="w-28 h-28 mb-8"
          style={{ transform: [{ scale: logoScale }] }}
          resizeMode="contain"
        />

        <Animated.Text className="text-2xl font-semibold text-[#213517] mb-2 text-center" style={{ opacity: textOpacity }}>
          Safer and Convenient Gas Orders
        </Animated.Text>

        <Animated.Text className="text-sm text-gray-500 text-center mb-10" style={{ opacity: textOpacity }}>
          Order gas from anywhere, anytime. Fast, safe, and reliable.
        </Animated.Text>

        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          }}
          className="w-full px-8"
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
    </View>
  );
}
