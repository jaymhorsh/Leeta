import React from 'react';
import { Text, View } from 'react-native';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className = '' }) => {
  if (text) {
    return (
      <View className={`flex-row items-center my-4 ${className}`}>
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="px-4 text-sm text-gray-500 font-matter">{text}</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>
    );
  }

  return <View className={`h-px bg-gray-200 my-4 ${className}`} />;
};

export default Divider;
