import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile', route: null },
  { icon: 'location-on', label: 'Addresses', route: null },
  { icon: 'payment', label: 'Payment Methods', route: null },
  { icon: 'notifications-none', label: 'Notifications', route: null },
  { icon: 'help-outline', label: 'Help & Support', route: null },
  { icon: 'settings', label: 'Settings', route: null },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('onboarded');
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-3xl font-matterBold text-brand-text">Profile</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center py-8 border-b border-gray-100">
          <View className="w-24 h-24 rounded-full bg-brand-primary/10 items-center justify-center mb-4">
            <MaterialIcons name="person" size={48} color="#00B388" />
          </View>
          <Text className="text-2xl font-matterBold text-brand-text mb-1">John Doe</Text>
          <Text className="text-gray-600 font-matter">john.doe@email.com</Text>
        </View>

        <View className="px-6 py-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <MaterialIcons name={item.icon as any} size={24} color="#213517" />
                <Text className="text-base font-matter text-brand-text ml-4">{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#848484" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={handleLogout} className="flex-row items-center py-4 mt-4">
            <MaterialIcons name="logout" size={24} color="#FF2F2F" />
            <Text className="text-base font-matterSemiBold text-red-600 ml-4">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
