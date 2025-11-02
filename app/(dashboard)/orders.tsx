import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const mockOrders = [
  { id: 1, vendor: 'Quick Gas Co.', date: '2025-11-01', status: 'Delivered', amount: '$45.00' },
  { id: 2, vendor: 'Fast Fuel Inc.', date: '2025-10-28', status: 'In Transit', amount: '$52.00' },
  { id: 3, vendor: 'City Gas Supply', date: '2025-10-25', status: 'Delivered', amount: '$48.50' },
];

export default function OrdersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-3xl font-matterBold text-brand-text">My Orders</Text>
        <Text className="text-gray-600 font-matter mt-1">Track your gas deliveries</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {mockOrders.map((order) => (
          <View key={order.id} className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-matterBold text-brand-text mb-1">{order.vendor}</Text>
                <Text className="text-sm text-gray-600 font-matter">Order #{order.id}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <Text className={`text-xs font-matterSemiBold ${order.status === 'Delivered' ? 'text-green-700' : 'text-yellow-700'}`}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-2">
              <MaterialIcons name="calendar-today" size={14} color="#848484" />
              <Text className="text-sm text-gray-600 font-matter ml-2">{order.date}</Text>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
              <Text className="text-lg font-matterBold text-brand-text">{order.amount}</Text>
              <TouchableOpacity>
                <Text className="text-brand-primary font-matterSemiBold">View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
