import { Button, Input } from '@/components';
import { useUpdateUser } from '@/hooks/settings';
import { useAuthStore } from '@/store/authStore';
import { UpdateUserRequest } from '@/types/settings';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [form, setForm] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
  });

  const handleSaveChanges = async () => {
    if (!user) return;

    if (!form.fullName.trim() || !form.email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const nameParts = form.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const userData: UpdateUserRequest = {
      firstName,
      lastName,
      email: form.email.trim(),
    };

    updateUser(userData);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality will be implemented here.', [{ text: 'OK' }]);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#213517" />
          </TouchableOpacity>
          <Text className="text-xl font-matterBold text-brand-text">Account</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Content Fields */}
        <View className="flex-1">
          {/* Full Name */}
          <View className="mt-6">
            <Input
              label="Full Name"
              placeholder="Full name"
              value={form.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
          {/* Email */}
          <View className="mb-2">
            <Input
              label="Email"
              placeholder="name@example.com"
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text className="text-lg font-matterSemiBold text-brand-text mb-2">Change Password</Text>
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            textClassName="text-text-secondary text-lg"
            className="bg-white border rounded-lg border-border"
          />
        </View>

        {/* Save Changes Button */}
        <View className="mb-6">
          <Button
            title={isPending ? 'Saving...' : 'Save Changes'}
            onPress={handleSaveChanges}
            disabled={isPending}
            className={isPending ? 'bg-gray-300' : 'bg-brand-primary'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Account;
