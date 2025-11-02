import { create } from 'zustand';

interface Profile {
  name: string;
  phone: string;
}

interface OnboardingState {
  step: number;
  goal: string;
  profile: Profile;
  location: string;
  setStep: (step: number) => void;
  setGoal: (goal: string) => void;
  setProfile: (profile: Profile) => void;
  setLocation: (location: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  goal: '',
  profile: { name: '', phone: '' },
  location: '',
  setStep: (step) => set({ step }),
  setGoal: (goal) => set({ goal }),
  setProfile: (profile) => set({ profile }),
  setLocation: (location) => set({ location }),
}));
