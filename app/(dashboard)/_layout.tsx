import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00B388',
        tabBarInactiveTintColor: '#848484',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E6E6E6',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Matter-Medium',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list-alt" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
