import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  className?: string;
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({ text, variant = 'default', className = '', style }) => {
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <View className={`px-3 py-1 rounded-full self-start ${variantStyles[variant]} ${className}`} style={style}>
      <Text className={`text-xs font-matterSemiBold ${variantStyles[variant].split(' ')[1]}`}>{text}</Text>
    </View>
  );
};

export default Badge;
