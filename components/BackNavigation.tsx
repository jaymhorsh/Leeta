import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BackNavigationProps {
  onPress?: () => void;
  title?: string;
}

const BackNavigation: React.FC<BackNavigationProps> = ({ onPress, title }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row h-16  bg-[#E7E7E7] items-center gap-3 px-5">
      <TouchableOpacity onPress={handlePress} className=" rounded-full items-center justify-center " activeOpacity={0.7}>
        <MaterialIcons name="arrow-back-ios" size={18} color="#000" />
      </TouchableOpacity>
      {title && (
        <View className="flex-1">
          <Text className="text-xl capitalize font-poppinsMedium text-textPrimary">{title}</Text>
        </View>
      )}
    </View>
  );
};

export default BackNavigation;
