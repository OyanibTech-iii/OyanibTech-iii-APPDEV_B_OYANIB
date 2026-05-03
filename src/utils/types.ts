import { StackNavigationProp } from '@react-navigation/stack';

export interface User {
  id?: number | string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  firstname?: string;
  lastname?: string;
  roles?: string[];
  avatar?: string;
  avatarUrl?: string;
  profileImage?: string;
  profile_image?: string;
  phone?: string;
  mobile?: string;
  bio?: string;
  data?: User[];
  results?: User[];
  'hydra:member'?: User[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  image?: string;
  stockType?: string;
  isAvailable?: boolean;
  currentStockQuantity?: number;
  data?: Product[];
  results?: Product[];
  'hydra:member'?: Product[];
}

export interface Stock {
  id: number;
  stockType: string;
  quantity: number;
  products: (Product | number | string)[];
  data?: Stock[];
  results?: Stock[];
  'hydra:member'?: Stock[];
}

export interface Course {
  id: number;
  title?: string;
  courseName?: string;
  description: string;
  duration_left: string;
  progress: number;
  tier?: string;
  price?: string | number;
  thumbnail?: string;
  data?: Course[];
  results?: Course[];
  'hydra:member'?: Course[];
}

export interface QrCode {
  id: number;
  user: string;
  identifier: string;
  qrCodePath?: string;
  createdAt: string;
  data?: QrCode[];
  results?: QrCode[];
  'hydra:member'?: QrCode[];
}

export interface AuthState {
  data: AuthResponse | null; 
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  registerData: RegisterResponse | null;
  registerLoading: boolean;
  registerError: boolean;
  registerErrorMessage: string;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  stocks: Stock[];
  stocksLoading: boolean;
  stocksError: string | null;
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  courses: Course[];
  coursesLoading: boolean;
  coursesError: string | null;
  qrCodes: QrCode[];
  qrCodesLoading: boolean;
  qrCodesError: string | null;
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

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Product: { id: number } | undefined;
  TermsPolicy: undefined;
  Courses: undefined;
  ErrorNav: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
