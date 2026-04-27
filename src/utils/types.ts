export interface User {
  id?: number;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  image?: string;
  stockType?: string;
}

export interface Stock {
  id: number;
  stockType: string;
  quantity: number;
  products: Product[] | number[];
}

export interface AuthState {
  data: any | null; // Detailed user/auth data from login
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  registerData: any | null;
  registerLoading: boolean;
  registerError: boolean;
  registerErrorMessage: string;
  products: Product[];
  productsLoading: boolean;
  productsError: any | null;
  stocks: Stock[];
  stocksLoading: boolean;
  stocksError: any | null;
  users: User[];
  usersLoading: boolean;
  usersError: any | null;
}

export interface RootState {
  auth: AuthState;
}

export interface AuthResponse {
  token?: string;
  data?: {
    token?: string;
    user?: User;
  };
  user?: User;
  message?: string;
}

export interface RegisterResponse {
  message?: string;
  user?: User;
}
