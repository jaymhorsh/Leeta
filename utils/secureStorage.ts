import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Keys for secure storage
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  ONBOARDING_STATUS: 'onboarding_status',
} as const;

/**
 * Save data securely
 * @param key - Storage key
 * @param value - Value to store (will be stringified if object)
 */
export const saveSecure = async (key: string, value: string | object): Promise<void> => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    if (Platform.OS === 'web') {
      // Fallback to localStorage for web
      localStorage.setItem(key, stringValue);
    } else {
      await SecureStore.setItemAsync(key, stringValue);
    }
  } catch (error) {
    console.error(`Error saving ${key} to secure storage:`, error);
    throw error;
  }
};

/**
 * Get data from secure storage
 * @param key - Storage key
 * @returns Stored value or null
 */
export const getSecure = async (key: string): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error(`Error getting ${key} from secure storage:`, error);
    return null;
  }
};

/**
 * Get and parse JSON data from secure storage
 * @param key - Storage key
 * @returns Parsed object or null
 */
export const getSecureJSON = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await getSecure(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error parsing JSON for ${key}:`, error);
    return null;
  }
};

/**
 * Delete data from secure storage
 * @param key - Storage key
 */
export const deleteSecure = async (key: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error deleting ${key} from secure storage:`, error);
    throw error;
  }
};

/**
 * Clear all secure storage
 */
export const clearSecureStorage = async (): Promise<void> => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await Promise.all(keys.map((key) => deleteSecure(key)));
  } catch (error) {
    console.error('Error clearing secure storage:', error);
    throw error;
  }
};

// Export storage keys for consistency
export { STORAGE_KEYS };
