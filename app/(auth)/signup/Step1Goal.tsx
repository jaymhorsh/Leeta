import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const goals = [
  { id: 'manage', label: 'To manage my finances' },
  { id: 'track', label: 'To figure out where my money is going' },
  { id: 'accomplish', label: 'I have goals I want to accomplish' },
  { id: 'looking', label: 'Just looking around' },
];

export default function Step1Goal() {
  const router = useRouter();
  const { goal, setGoal, setStep } = useOnboardingStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goal ? [goal] : []);

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      setGoal(selectedGoals.join(', '));
      setStep(2);
      router.push('/(auth)/signup/Step2Profile');
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
          <View className="h-1 w-16 bg-gray-200 rounded mx-1" />
          <View className="h-1 w-16 bg-gray-200 rounded" />
        </View>

        <View className="w-10" />
      </View>

      <View className="px-6 mb-6">
        <Text className="text-sm text-gray-500 mb-2 font-matter">Step 1 / 3</Text>
        <Text className="text-3xl font-matterBold text-brand-text mb-2">Tell us your goal</Text>
        <Text className="text-gray-600 font-matter">This will help us personalize your experience.</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {goals.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleGoal(item.id)}
            className={`p-4 mb-3 rounded-2xl border-2 ${
              selectedGoals.includes(item.id) ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 bg-white'
            }`}
          >
            <View className="flex-row items-center">
              <View
                className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
                  selectedGoals.includes(item.id) ? 'border-brand-primary bg-brand-primary' : 'border-gray-300 bg-white'
                }`}
              >
                {selectedGoals.includes(item.id) && <MaterialIcons name="check" size={16} color="#ffffff" />}
              </View>
              <Text className="text-base font-matter text-brand-text flex-1">{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-6 mb-10">
        <TouchableOpacity
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
          className={`py-4 rounded-full ${selectedGoals.length > 0 ? 'bg-brand-primary' : 'bg-gray-300'}`}
        >
          <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
