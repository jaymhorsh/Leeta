import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  onRemove?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, icon, onRemove, className = '' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center px-4 py-2 rounded-full ${selected ? 'bg-brand-primary' : 'bg-gray-100'} ${className}`}
      activeOpacity={0.7}
    >
      {icon && <MaterialIcons name={icon} size={16} color={selected ? '#FFFFFF' : '#000000'} style={{ marginRight: 6 }} />}
      <Text className={`text-sm font-matterMedium ${selected ? 'text-white' : 'text-brand-text'}`}>{label}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} className="ml-2" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="close" size={16} color={selected ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Chip;
