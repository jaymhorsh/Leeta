import { api } from '@/services/axios';
import { DeleteUserResponse, UpdateUserRequest, UpdateUserResponse } from '@/types/settings';

// Update user profile
export const updateUser = async (userId: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> => {
  const { data } = await api.put(`/users/${userId}`, userData);
  return data;
};

// Delete user account
export const deleteUser = async (userId: number): Promise<DeleteUserResponse> => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};
