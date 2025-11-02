import { AxiosError } from 'axios';

export const handleAxiosError = async (error: AxiosError) => {
  console.error('Axios error:', error);

  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    console.error(`Server error ${status}:`, data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network error:', error.request);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
};
