import { UserProfile } from './auth';

// User update request payload
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

// User update response (same as UserProfile since DummyJSON returns the updated user)
export type UpdateUserResponse = UserProfile;

// User delete response from DummyJSON
export interface DeleteUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  ip?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
      coin: string;
      wallet: string;
      network: string;
    };
    role: string;
  };
  isDeleted: boolean;
  deletedOn: string;
}

// Settings store state interface
export interface SettingsState {
  isLoading: boolean;
  error: string | null;
}

// Settings store actions interface
export interface SettingsActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Settings store interface
export interface SettingsStore extends SettingsState, SettingsActions {}
