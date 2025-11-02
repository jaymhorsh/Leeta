import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function Step2Profile() {
  const router = useRouter();
  const { setProfile, setStep } = useOnboardingStore();
  const [username, setUsername] = useState('');

  const handleContinue = () => {
    if (username.trim() && username.length <= 15) {
      setProfile({ name: username, phone: username });
      setStep(3);
      router.push('/(auth)/signup/Step3Currency');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center"
        >
          <MaterialIcons name="arrow-back" size={20} color="#213517" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 justify-center px-4">
          <View className="h-1 w-16 bg-brand-primary rounded" />
          <View className="h-1 w-16 bg-brand-primary rounded mx-1" />
          <View className="h-1 w-16 bg-gray-200 rounded" />
        </View>

        <View className="w-10" />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-2 font-matter">Step 2 / 3</Text>
            <Text className="text-3xl font-matterBold text-brand-text mb-2">Set Up Your Profile</Text>
            <Text className="text-gray-600 font-matter">Choose a unique username to personalize your experience.</Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-brand-text mb-2 font-matterSemiBold">Username</Text>
            <View className="flex-row items-center border-2 border-gray-200 rounded-2xl px-4 py-4 bg-gray-50">
              <MaterialIcons name="alternate-email" size={20} color="#9CA3AF" />
              <TextInput
                value={username}
                onChangeText={(text) => text.length <= 15 && setUsername(text)}
                placeholder="username"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-base font-matter ml-2 text-brand-text"
                autoCapitalize="none"
                maxLength={15}
              />
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-xs text-gray-500 font-matter">*Name should be 15 characters or less</Text>
              <Text className="text-xs text-gray-500 font-matter">{username.length}/15</Text>
            </View>
          </View>
        </ScrollView>

        <View className="px-6 pb-14">
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!username.trim() || username.length > 15}
            className={`py-4 rounded-full ${username.trim() && username.length <= 15 ? 'bg-brand-primary' : 'bg-gray-300'}`}
          >
            <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
