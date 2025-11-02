import { api } from '@/services/axios';
import { User, UsersResponse } from '@/types/api';
import { API_ROUTES } from '@/constants/apiRoutes';

// Fetch all users
export const fetchUsers = async (): Promise<UsersResponse> => {
  const { data } = await api.get(API_ROUTES.users.all);
  return data;
};

// Fetch single user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const { data } = await api.get(API_ROUTES.users.single(id));
  return data;
};

// Search users
export const searchUsers = async (query: string): Promise<UsersResponse> => {
  const { data } = await api.get(`${API_ROUTES.users.search}?q=${query}`);
  return data;
};
