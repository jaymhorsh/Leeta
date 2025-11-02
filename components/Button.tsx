import { TodoButtonProps } from '@/types/ui';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

const TodoButton: React.FC<TodoButtonProps & { backgroundColor?: string }> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  className = '',
  textClassName = '',
  iconName = '',
  iconPosition = 'left',
  iconSize = 24,
  iconColor = '#ffffff',
  backgroundColor,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`
        flex-row items-center justify-center rounded-2xl
        h-[56px]
        ${isDisabled ? 'opacity-50' : ''}
        ${className || 'bg-brand-primary'}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      style={backgroundColor ? { backgroundColor } : undefined}
      onPress={onPress}
      disabled={isDisabled}
    >
      {/* Left Icon */}
      {iconName && iconPosition === 'left' && !loading && (
        <MaterialIcons name={iconName as any} size={iconSize} color={iconColor} style={{ marginRight: 8 }} />
      )}

      {/* Label or Loader */}
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <Text className={`text-base font-matterSemiBold ${textClassName || 'text-white'}`}>{title}</Text>
      )}

      {/* Right Icon */}
      {iconName && iconPosition === 'right' && !loading && (
        <MaterialIcons name={iconName as any} size={iconSize} color={iconColor} style={{ marginLeft: 8 }} />
      )}
    </Pressable>
  );
};

export default TodoButton;
