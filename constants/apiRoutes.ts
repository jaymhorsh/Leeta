// API Routes Configuration
export const API_ROUTES = {
  // Products
  products: {
    all: '/products',
    single: (id: number) => `/products/${id}`,
    search: '/products/search',
    categories: '/products/categories',
    category: (category: string) => `/products/category/${category}`,
  },

  // Users
  users: {
    all: '/users',
    single: (id: number) => `/users/${id}`,
    search: '/users/search',
    filter: '/users/filter',
    posts: (id: number) => `/users/${id}/posts`,
    todos: (id: number) => `/users/${id}/todos`,
    carts: (id: number) => `/users/${id}/carts`,
  },

  // Auth
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },

  // Posts
  posts: {
    all: '/posts',
    single: (id: number) => `/posts/${id}`,
    search: '/posts/search',
    user: (userId: number) => `/posts/user/${userId}`,
    comments: (id: number) => `/posts/${id}/comments`,
  },

  // Comments
  comments: {
    all: '/comments',
    single: (id: number) => `/comments/${id}`,
    post: (postId: number) => `/comments/post/${postId}`,
  },

  // Recipes
  recipes: {
    all: '/recipes',
    single: (id: number) => `/recipes/${id}`,
    search: '/recipes/search',
    tags: '/recipes/tags',
    tag: (tag: string) => `/recipes/tag/${tag}`,
    meal: (meal: string) => `/recipes/meal-type/${meal}`,
  },

  // Carts
  carts: {
    all: '/carts',
    single: (id: number) => `/carts/${id}`,
    user: (userId: number) => `/carts/user/${userId}`,
  },

  // Todos
  todos: {
    all: '/todos',
    single: (id: number) => `/todos/${id}`,
    random: '/todos/random',
    user: (userId: number) => `/todos/user/${userId}`,
  },

  // Quotes
  quotes: {
    all: '/quotes',
    single: (id: number) => `/quotes/${id}`,
    random: '/quotes/random',
  },
} as const;

// Query params builder helper
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Pagination params helper
export const buildPaginationParams = (limit: number, skip: number, additionalParams?: Record<string, any>) => {
  return buildQueryParams({
    limit,
    skip,
    ...additionalParams,
  });
};
