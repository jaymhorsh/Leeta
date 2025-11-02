import { Notifier, NotifierComponents } from 'react-native-notifier';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

type AlertType = 'success' | 'error' | 'warn' | 'info';

const SafeAreaAlert = (props: any) => {
  const insets = useSafeAreaInsets();

  // Calculate proper top margin to position below status bar
  const topMargin = Platform.OS === 'ios' ? insets.top + 10 : insets.top + 20;

  return (
    <NotifierComponents.Alert
      {...props}
      style={[
        props.style,
        {
          marginTop: topMargin,
          marginHorizontal: 16,
        },
      ]}
    />
  );
};

export const showToast = (type: AlertType, message: string, options: Partial<Parameters<typeof Notifier.showNotification>[0]> = {}) => {
  const { componentProps, ...restOptions } = options;
  Notifier.showNotification({
    description: message,
    Component: SafeAreaAlert,
    componentProps: {
      alertType: type,
      ...(componentProps || {}),
    },
    duration: 3000, // Auto-hide after 3 seconds
    showAnimationDuration: 300,
    hideAnimationDuration: 300,
    ...restOptions,
  });
};

export const showWarning = (message: string) => {
  showToast('warn', message);
};

export const showSuccess = (message: string) => {
  showToast('success', message);
};

export const showError = (message: string) => {
  showToast('error', message);
};

export const showNotification = (
  title: string,
  message: string,
  options?: {
    duration?: number;
    showAnimationDuration?: number;
    onPress?: () => void;
  },
) => {
  Notifier.showNotification({
    title,
    description: message,
    Component: SafeAreaAlert,
    duration: options?.duration || 3000,
    showAnimationDuration: options?.showAnimationDuration || 300,
    hideAnimationDuration: 300,
    onPress: options?.onPress || (() => Notifier.hideNotification()),
  });
};
