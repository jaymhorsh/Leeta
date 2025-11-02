import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { deleteToken, getToken, setToken } from '../storage/token';
import { AuthStore, UserProfile } from '../types/auth';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setAuth: async (user, accessToken, refreshToken) => {
        try {
          await setToken('accessToken', accessToken || '');
          await setToken('refreshToken', refreshToken || '');
          await setToken('user', JSON.stringify(user));

          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to set auth:', error);
          throw error;
        }
      },

      loadAuth: async () => {
        try {
          set({ isLoading: true });
          const accessToken = await getToken('accessToken');
          const userData = await getToken('user');

          let user: UserProfile | null = null;
          if (userData) {
            try {
              user = JSON.parse(userData);
            } catch (parseError) {
              console.error('Failed to parse user data:', parseError);
              await deleteToken('user');
            }
          }

          set({
            accessToken,
            user,
            isAuthenticated: !!(accessToken && user),
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to load authentication:', error);
        }
      },

      setUser: (user) => {
        set({ user });
      },

      setTokens: async (accessToken, refreshToken) => {
        try {
          // Store tokens in secure storage - ensure they are strings
          await setToken('accessToken', accessToken || '');
          await setToken('refreshToken', refreshToken || '');

          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Failed to set tokens:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          // Remove tokens from secure storage
          await deleteToken('accessToken');
          await deleteToken('refreshToken');
          await deleteToken('user');

          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to logout:', error);
          // Still clear the state even if storage cleanup fails
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          try {
            const value = await getToken(name);
            return value;
          } catch (error) {
            console.error('Error getting item from storage:', error);
            return null;
          }
        },
        setItem: async (name, value) => {
          try {
            // Ensure the value is a string before storing
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            await setToken(name, stringValue);
          } catch (error) {
            console.error('Error setting item in storage:', error);
          }
        },
        removeItem: async (name) => {
          try {
            await deleteToken(name);
          } catch (error) {
            console.error('Error removing item from storage:', error);
          }
        },
      })),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
