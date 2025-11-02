import { api } from '../services/axios';
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, UserProfile } from '../types/auth';

// Login user and get tokens
export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

// Get current authenticated user
export const getCurrentUser = async (): Promise<UserProfile> => {
  const { data } = await api.get('/auth/me');
  return data;
};

// Refresh authentication session
export const refreshAuth = async (payload: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const { data } = await api.post('/auth/refresh', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};
