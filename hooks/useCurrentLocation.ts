import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Hook for getting current location
export const useLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setIsLoading(true);
        setErrorMsg(null);

        // Check if location services are enabled
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
          Alert.alert('Access to Location services are disabled');
          setIsLoading(false);
          return;
        }

        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          setIsLoading(false);
          return;
        }

        // Get initial location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const locationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        setLocation(locationData);
        console.log('Location initialized:', locationData);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize rider location:', error);
        setErrorMsg('Failed to get location');
        setIsLoading(false);
      }
    };

    initializeLocation();
  }, []);

  return { location, isLoading, errorMsg };
};

// Legacy hook for backward compatibility
const useCurrentLocation = () => {
  const { location, isLoading, errorMsg } = useLocation();
  return { location, errorMsg, isLoading };
};

export default useCurrentLocation;
