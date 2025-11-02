declare module 'react-native-switch-selector' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface SwitchSelectorProps {
    options: {
      label: string;
      value: string | number;
      color?: string;
      activeColor?: string;
      backgroundColor?: string;
      activeBackgroundColor?: string;
    }[];
    initial?: number;
    onPress?: (value: string | number) => void;
    fontSize?: number;
    selectedColor?: string;
    buttonColor?: string;
    borderColor?: string;
    borderRadius?: number;
    hasPadding?: boolean;
    animationDuration?: number;
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    selectedTextStyle?: TextStyle;
    textStyle?: TextStyle;
    style?: ViewStyle;
    disabled?: boolean;
    accessibilityLabel?: string;
    testID?: string;
  }

  export default class SwitchSelector extends Component<SwitchSelectorProps> {}
}
