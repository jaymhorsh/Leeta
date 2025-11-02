// Authentication request types
export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

// Authentication response types
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface RefreshTokenRequest {
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Auth state types
export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setAuth: (user: UserProfile, accessToken: string, refreshToken: string) => void;
  setUser: (user: UserProfile) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  loadAuth: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;
