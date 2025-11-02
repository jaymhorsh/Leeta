import { MaterialIcons } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

export interface TodoInputProps extends Omit<TextInputProps, 'className'> {
  isPassword?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
  error?: string;
  label?: string;
}

export interface ControlledInputProps extends Omit<TodoInputProps, 'value' | 'onChangeText'> {
  name: string;
  control: any; // from react-hook-form Controller
  rules?: any; // zodResolver handles most; still allow optional per-field rules
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TodoButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  iconSize?: number;
  iconColor?: string;
}
