import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeStore {
  themeColor: string;
  setThemeColor: (color: string) => void;
  resetThemeColor: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeColor: '#24A19C', // Default brand color

      setThemeColor: (color: string) => {
        set({ themeColor: color });
      },

      resetThemeColor: () => {
        set({ themeColor: '#24A19C' });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
