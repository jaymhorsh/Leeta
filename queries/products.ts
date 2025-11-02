import { api } from '@/services/axios';
import { ProductsResponse, Product } from '@/types/api';
import { API_ROUTES, buildPaginationParams } from '@/constants/apiRoutes';

const ITEMS_PER_PAGE = 10;

// Fetch paginated products
export const fetchProducts = async ({ pageParam = 0 }): Promise<ProductsResponse> => {
  const queryParams = buildPaginationParams(ITEMS_PER_PAGE, pageParam);
  const { data } = await api.get(`${API_ROUTES.products.all}${queryParams}`);
  return data;
};

// Fetch single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get(API_ROUTES.products.single(id));
  return data;
};

// Search products
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const { data } = await api.get(`${API_ROUTES.products.search}?q=${query}`);
  return data;
};
