import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <View className={`flex-1 items-center justify-center px-8 ${className}`}>
      <MaterialIcons name={icon} size={64} color="#CBD5E1" />
      <Text className="text-xl font-matterBold text-brand-text mt-4 text-center">{title}</Text>
      {description && (
        <Text className="text-base font-matter text-gray-600 mt-2 text-center">{description}</Text>
      )}
      {action && <View className="mt-6">{action}</View>}
    </View>
  );
};

export default EmptyState;
