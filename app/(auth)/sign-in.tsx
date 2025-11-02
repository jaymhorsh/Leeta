import { Button, Input } from '@/components';
import { useLogin } from '@/hooks/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginForm {
  username: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
  });

  const { mutate: loginMutation, isPending: isLoading } = useLogin();

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    loginMutation({
      username: formData.username.trim(),
      password: formData.password.trim(),
      expiresInMins: 60, // 1 hour
    });
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup/Step1Goal');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6">
        {/* Header */}
        <View className="mt-14 mb-16">
          <Text className="text-3xl font-sf-bold text-neutral-primary text-center mb-3">Welcome Back!</Text>
          <Text className="text-lg font-sf-regular text-neutral-secondary text-center">Sign in to continue ordering gas</Text>
          {/* Input Section */}
          <View className="mt-10 justify-center">
            <Input
              label="Username"
              placeholder="Enter your username"
              placeholderTextColor="#767E8C"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              placeholderTextColor="#767E8C"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              isPassword={true}
            />

            {/* Demo Credentials Info */}
            <View className="mb-6 p-4 bg-blue-50 rounded-lg">
              <Text className="text-base font-sf-medium text-blue-800 mb-2">Demo Credentials:</Text>
              <Text className="text-sm text-blue-600 font-sf-regular">
                Username: emilys{'\n'}
                Password: emilyspass
              </Text>
            </View>
          </View>
        </View>
        {/* Sign Up Link */}
        <View className="mb-2">
          <Button
            title={isLoading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            className="bg-brand mb-2"
            disabled={!formData.username.trim() || !formData.password.trim() || isLoading}
          />
          <Text className="text-center text-neutral-secondary font-sf-regular">
            Don&apos;t have an account?{' '}
            <Text className="text-brand font-sf-medium" onPress={handleSignUp}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
