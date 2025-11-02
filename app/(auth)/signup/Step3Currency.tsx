import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currencies = [
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺' },
  { code: 'GBP', name: 'British Pound Sterling', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦' },
  { code: 'CNY', name: 'Chinese Yuan Renminbi', country: 'China', flag: '🇨🇳' },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'USD', name: 'US Dollars', country: 'USA', flag: '🇺🇸' },
];

export default function Step3Currency() {
  const router = useRouter();
  const { location, setLocation } = useOnboardingStore();
  const [selectedCurrency, setSelectedCurrency] = useState(location || 'CAD');
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency);

  const handleContinue = async () => {
    if (selectedCurrency) {
      setLocation(selectedCurrency);
      await AsyncStorage.setItem('onboarded', 'true');
      router.replace('/(auth)/sign-in');
    }
  };

  const selectCurrency = (code: string) => {
    setSelectedCurrency(code);
    setModalVisible(false);
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
          <View className="h-1 w-16 bg-brand-primary rounded" />
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-sm text-gray-500 mb-2 font-matter">Step 3 / 3</Text>
          <Text className="text-3xl font-matterBold text-brand-text mb-2">Choose your currency</Text>
          <Text className="text-gray-600 font-matter">
            Please select the currency you would primarily use for transactions from the menu below.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm text-brand-text mb-2 font-matterSemiBold">Currency</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex-row items-center border-2 border-gray-200 rounded-2xl px-4 py-4 bg-gray-50"
          >
            <Text className="text-2xl mr-3">{selectedCurrencyData?.flag}</Text>
            <Text className="text-base font-matter flex-1 text-brand-text">{selectedCurrency}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <Text className="text-xs text-gray-500 mt-2 font-matter">*You can change this later</Text>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <TouchableOpacity onPress={handleContinue} className="bg-brand-primary py-4 rounded-full">
          <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Pressable className="flex-1 bg-black/50" onPress={() => setModalVisible(false)}>
          <View className="flex-1" />
          <Pressable className="bg-white rounded-t-3xl" onPress={(e) => e.stopPropagation()}>
            <View className="px-6 py-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-matterBold text-brand-text">Select Currency</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <MaterialIcons name="close" size={20} color="#213517" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="max-h-96 px-6" showsVerticalScrollIndicator={false}>
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.code}
                  onPress={() => selectCurrency(currency.code)}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100"
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{currency.flag}</Text>
                    <View className="flex-1">
                      <Text className="text-base font-matterSemiBold text-brand-text">{currency.name}</Text>
                      <Text className="text-sm text-gray-500 font-matter">{currency.country}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-gray-500 mr-3 font-matter">{currency.code}</Text>
                    {selectedCurrency === currency.code && <MaterialIcons name="check-circle" size={24} color="#00B388" />}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="px-6 py-4">
              <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-brand-primary py-4 rounded-full">
                <Text className="text-white text-center font-matterSemiBold text-base">Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
