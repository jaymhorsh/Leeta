import { getCurrentUser, login, refreshAuth } from '@/queries/auth';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest, RefreshTokenRequest } from '@/types/auth';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAuth, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
      const userProfile = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };

      await setAuth(userProfile, data.accessToken, data.refreshToken);
      await AsyncStorage.setItem('onboarded', 'true');

      queryClient.invalidateQueries({ queryKey: ['user'] });
      showToast('success', 'Login successful!');
      router.replace('/(dashboard)/home');
    },
    onError: (error: any) => {
      showToast('error', error?.response?.data?.message || 'Login failed. Please try again.');
    },
    onSettled: () => setLoading(false),
  });
};

// Current user query hook
export const useCurrentUser = () => {
  const { accessToken, isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: getCurrentUser,
    enabled: !!accessToken && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// Refresh auth tokens
export const useRefreshAuth = () => {
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationFn: (data: RefreshTokenRequest) => refreshAuth(data),
    onSuccess: (data) => setTokens(data.accessToken, data.refreshToken),
    onError: (error: any) => console.error('Token refresh error:', error),
  });
};

// Pure auth state hook
export const useAuth = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  return { isAuthenticated: !!(isAuthenticated && user), user, isLoading };
};

// Logout hook
export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    try {
      logout();
      queryClient.clear();
      showToast('success', 'Logged out successfully');
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('error', 'Logout failed. Please try again.');
    }
  };
  return { logout: handleLogout };
};
