import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useState } from 'react';
import { saveSecure, STORAGE_KEYS } from '@/utils/secureStorage';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleContinue = async () => {
    if (selectedCurrency) {
      setLocation(selectedCurrency);
      await saveSecure(STORAGE_KEYS.ONBOARDING_STATUS, 'true');
      router.replace('/(dashboard)/home');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <View className="mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mb-4">
          <View className="h-1 flex-1 bg-brand-primary rounded" />
          <View className="h-1 flex-1 bg-brand-primary rounded mx-1" />
          <View className="h-1 flex-1 bg-brand-primary rounded" />
        </View>
        <Text className="text-xs text-gray-500 mb-2">Step 3 / 3</Text>
        <Text className="text-3xl font-matterBold text-brand-text mb-2">Choose your currency</Text>
        <Text className="text-gray-600">Please select the currency you would primarily use for transactions from the menu below.</Text>
      </View>

      <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Currency</Text>
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
          <Text className="text-base font-matter flex-1">{selectedCurrency}</Text>
          <Text className="text-gray-400">›</Text>
        </View>
        <Text className="text-xs text-gray-500 mt-2">*You can change this later</Text>
      </View>

      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">#
        <ScrollView className="max-h-80" showsVerticalScrollIndicator={false}>
          {filteredCurrencies.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              onPress={() => setSelectedCurrency(currency.code)}
              className="flex-row items-center justify-between py-3 border-b border-gray-100"
            >
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">{currency.flag}</Text>
                <View className="flex-1">
                  <Text className="text-base font-matterSemiBold text-brand-text">{currency.name}</Text>
                  <Text className="text-sm text-gray-500">{currency.country}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-500 mr-3">{currency.code}</Text>
                {selectedCurrency === currency.code && (
                  <View className="w-5 h-5 rounded-full bg-brand-primary items-center justify-center">
                    <Text className="text-white text-xs">✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={handleContinue} className="bg-brand-primary py-4 rounded-full mb-6">
        <Text className="text-white text-center font-matterSemiBold text-base">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
