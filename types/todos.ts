// Todo item interface
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

// Todos response from DummyJSON
export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// Todos query parameters
export interface TodosQueryParams {
  limit: number;
  skip: number;
}

// Todo filter options
export interface TodoFilter {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

// Todo label options
export interface TodoLabel {
  id: string;
  label: string;
  icon: string;
}
