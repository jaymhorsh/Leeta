import { secureStorage } from '../secureStorage';

export const setToken = async (name: string, value: string): Promise<void> => {
  try {
    await secureStorage.setItem(name, value);
  } catch (error) {
    console.error('Failed to set token:', error);
  }
};

export const deleteToken = async (name: string): Promise<void> => {
  try {
    await secureStorage.deleteItem(name);
  } catch (error) {
    console.error('Failed to delete token:', error);
    throw new Error('Failed to delete authentication token');
  }
};

export const getToken = async (name: string): Promise<string | null> => {
  try {
    const value = await secureStorage.getItem(name);
    return value;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const clearAllTokens = async (): Promise<void> => {
  try {
    const keys = ['token', 'user', 'refreshToken'];
    await Promise.all(keys.map((key) => deleteToken(key)));
  } catch (error) {
    console.error('Failed to clear all tokens:', error);
    throw new Error('Failed to clear authentication data');
  }
};

export const hasValidToken = async (): Promise<boolean> => {
  try {
    const token = await getToken('token');
    return token !== null && token !== undefined;
  } catch (error) {
    console.error('Failed to check token validity:', error);
    return false;
  }
};
