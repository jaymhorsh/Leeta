import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';

export default function Step2Profile() {
  const router = useRouter();
  const { setProfile, setStep } = useOnboardingStore();
  const [username, setUsername] = useState('');

  const handleContinue = () => {
    if (username.trim()) {
      setProfile({ name: username, phone: username });
      setStep(3);
      router.push('/(auth)/signup/Step3Currency');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <View className="mb-8">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mb-4">
          <View className="h-1 flex-1 bg-brand-primary rounded" />
          <View className="h-1 flex-1 bg-brand-primary rounded mx-1" />
          <View className="h-1 flex-1 bg-gray-200 rounded" />
        </View>
        <Text className="text-xs text-gray-500 mb-2">Step 2 / 3</Text>
        <Text className="text-3xl font-matterBold text-brand-text mb-2">Set Up Your Profile</Text>
        <Text className="text-gray-600">Choose a unique username to personalize your experience.</Text>
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-700 mb-2">Username</Text>
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3">
          <Text className="text-gray-400 mr-2">@</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="username"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base font-matter"
            autoCapitalize="none"
          />
        </View>
        <Text className="text-xs text-gray-500 mt-2">*Name should be 15 characters or less</Text>
        <View className="flex-row justify-between mt-1">
          <Text className="text-xs text-gray-500">0/15</Text>
        </View>
      </View>

      <View className="flex-1" />

      <TouchableOpacity
        onPress={handleContinue}
        disabled={!username.trim()}
        className={`py-4 rounded-full mb-6 ${username.trim() ? 'bg-brand-primary' : 'bg-gray-300'}`}
      >
        <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
