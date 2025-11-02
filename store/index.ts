import { UserProfile } from '@/types/auth';
import { create } from 'zustand';

interface AppState {
  user: null | UserProfile;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export { useAuthStore } from './authStore';
export { useThemeStore } from './themeStore';
