import { deleteUser, updateUser } from '@/queries/setting';
import { useAuthStore } from '@/store/authStore';
import { UpdateUserRequest } from '@/types/settings';
import { showToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export const useUpdateUser = () => {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UpdateUserRequest) => updateUser(user?.id!, userData),
    onSuccess: (updatedUser) => {
      // Update local user state
      if (user) {
        setUser({
          ...user,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
        });
      }

      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: ['user'] });

      showToast('success', 'Account updated successfully!');

      // Show success modal with updated data
      Alert.alert(
        'Success!',
        `Account updated successfully!\n\nNew Details:\nName: ${updatedUser.firstName} ${updatedUser.lastName}\nEmail: ${updatedUser.email}`,
        [{ text: 'OK' }],
      );
    },
    onError: (error: any) => {
      console.error('Update error:', error);
      showToast('error', 'Failed to update account. Please try again.');
    },
  });
};

export const useDeleteUser = () => {
  const { logout: logoutFromStore } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: (deletedUser) => {
      if (deletedUser.isDeleted) {
        // Clear React Query cache
        queryClient.clear();

        // Clear auth store
        logoutFromStore();

        showToast('success', 'Account deleted successfully');

        // Navigate to welcome screen
        router.replace('/(auth)/welcome');
      } else {
        throw new Error('Failed to delete account');
      }
    },
    onError: (error: any) => {
      console.error('Delete account error:', error);
      showToast('error', 'Failed to delete account. Please try again.');
    },
  });
};
