import axios from 'axios';
import { getToken } from '../storage/token';
import { handleAxiosError } from '../utils/error';

// Create axios instance for DummyJSON API
export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: true,
});

// Interceptor for DummyJSON API
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    await handleAxiosError(error);
    return Promise.reject(error);
  },
);

// Interceptor for other APIs
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    await handleAxiosError(error);
    return Promise.reject(error);
  },
);
