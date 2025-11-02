import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export class SecureStorageService {
  private static instance: SecureStorageService;

  static getInstance(): SecureStorageService {
    if (!SecureStorageService.instance) {
      SecureStorageService.instance = new SecureStorageService();
    }
    return SecureStorageService.instance;
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // Simple localStorage for web
        localStorage.setItem(key, value);
      } else {
        // Simple SecureStore for native - no authentication prompts
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error('SecureStorage setItem error:', error);
      throw new Error('Failed to store secure data');
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error('SecureStorage getItem error:', error);
      return null;
    }
  }

  async deleteItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('SecureStorage deleteItem error:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.clear();
      } else {
        // For native, we can't clear all, so just log it
        console.log('SecureStore clearAll not supported on native platforms');
      }
    } catch (error) {
      console.error('SecureStorage clearAll error:', error);
    }
  }
  // check if storage is available
  isAvailable(): boolean {
    return Platform.OS !== 'web' || typeof localStorage !== 'undefined';
  }
}
export const secureStorage = SecureStorageService.getInstance();
