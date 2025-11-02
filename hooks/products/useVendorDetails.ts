import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/queries/products';

export const useVendorDetails = (id: number) => {
  return useQuery({
    queryKey: ['vendorDetails', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};
