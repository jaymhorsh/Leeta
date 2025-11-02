import { TodoInputProps } from '@/types/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const TodoInput: React.FC<TodoInputProps> = ({
  isPassword = false,
  containerClassName = '',
  inputClassName = '',
  leftIcon,
  label = '',
  error,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-matterSemiBold text-brand-text mb-2">{label}</Text>
      <View
        className={`flex-row items-center bg-surface-gray h-[56px] rounded-lg px-4 border ${
          error ? 'border-red-500' : 'border-border'
        } ${containerClassName}`}
      >
        {leftIcon}
        <TextInput
          placeholderTextColor="#848484"
          secureTextEntry={secureTextEntry}
          className={`flex-1 text-brand-text text-base h-16 ${inputClassName}`}
          {...props}
        />
        {isPassword && (
          <Pressable className="p-2" onPress={toggleSecureTextEntry}>
            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={22} color="#848484" />
          </Pressable>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 px-2">{error}</Text>}
    </View>
  );
};
export default TodoInput;
