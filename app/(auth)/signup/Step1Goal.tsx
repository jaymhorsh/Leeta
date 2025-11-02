import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';

const goals = [
  { id: 'manage', label: 'To manage my finances' },
  { id: 'track', label: 'To figure out where my money is going' },
  { id: 'accomplish', label: 'I have goals I want to accomplish' },
  { id: 'looking', label: 'Just looking around' },
];

export default function Step1Goal() {
  const router = useRouter();
  const { goal, setGoal, setStep } = useOnboardingStore();
  const [selectedGoal, setSelectedGoal] = useState(goal);

  const handleContinue = () => {
    if (selectedGoal) {
      setGoal(selectedGoal);
      setStep(2);
      router.push('/(auth)/signup/Step2Profile');
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
          <View className="h-1 flex-1 bg-gray-200 rounded mx-1" />
          <View className="h-1 flex-1 bg-gray-200 rounded" />
        </View>
        <Text className="text-xs text-gray-500 mb-2">Step 1 / 3</Text>
        <Text className="text-3xl font-matterBold text-brand-text mb-2">Tell us your goal</Text>
        <Text className="text-gray-600">This will help us personalize your experience.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {goals.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedGoal(item.id)}
            className={`p-4 mb-3 rounded-xl border-2 ${
              selectedGoal === item.id ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200'
            }`}
          >
            <View className="flex-row items-center">
              <View
                className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                  selectedGoal === item.id ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'
                }`}
              >
                {selectedGoal === item.id && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text className="text-base font-matter flex-1">{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedGoal}
        className={`py-4 rounded-full mb-6 ${selectedGoal ? 'bg-brand-primary' : 'bg-gray-300'}`}
      >
        <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
