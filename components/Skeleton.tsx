import React from 'react';
import { View, ViewStyle, DimensionValue } from 'react-native';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  rounded?: boolean;
  className?: string;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 20, rounded = false, className = '', style }) => {
  return <View className={`bg-gray-200 ${rounded ? 'rounded-full' : 'rounded-lg'} ${className}`} style={[{ width, height }, style]} />;
};

export default Skeleton;
