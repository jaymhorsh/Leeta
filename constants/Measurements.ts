import { Platform } from 'react-native';

export const Measurements = {
  STATUS_BAR_HEIGHT: Platform.OS === 'ios' ? 20 : 0,
  PADDING_HORIZONTAL: 20,
  PADDING_VERTICAL: 16,
  BORDER_RADIUS: 8,
  BORDER_RADIUS_LARGE: 12,
  BORDER_RADIUS_SMALL: 4,
};
