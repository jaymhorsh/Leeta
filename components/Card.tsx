import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <View className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`} style={style}>
      {children}
    </View>
  );
};

export default Card;
