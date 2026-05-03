import { AuthState, Product, Stock, User, Course, QrCode, AuthResponse, RegisterResponse } from '../../utils/types';
import {
  USER_LOGIN,
  USER_GOOGLE_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_LOGOUT,
  LOGIN_RESET,
  USER_LOGIN_RESET,
  USER_REGISTER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_RESET,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_STOCKS_REQUEST,
  GET_STOCKS_SUCCESS,
  GET_STOCKS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
  GET_QR_CODES_REQUEST,
  GET_QR_CODES_SUCCESS,
  GET_QR_CODES_FAILURE
} from '../actions';

const INITIAL_STATE: AuthState = {
  data: null,
  token: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  registerData: null,
  registerLoading: false,
  registerError: false,
  registerErrorMessage: '',
  products: [],
  productsLoading: false,
  productsError: null,
  stocks: [],
  stocksLoading: false,
  stocksError: null,
  users: [],
  usersLoading: false,
  usersError: null,
  courses: [],
  coursesLoading: false,
  coursesError: null,
  qrCodes: [],
  qrCodesLoading: false,
  qrCodesError: null,
};

interface AuthAction {
  type: string;
  payload?: AuthResponse | RegisterResponse | Product[] | Stock[] | User[] | Course[] | QrCode[] | string | null;
}

export default function reducer(state = INITIAL_STATE, action: AuthAction): AuthState {
  console.log(action.type);
  switch (action.type) {

    case GET_PRODUCTS_REQUEST:
      return { ...state, productsLoading: true, productsError: null };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload as Product[], productsLoading: false, productsError: null };

    case GET_PRODUCTS_FAILURE:
      return { ...state, productsLoading: false, productsError: action.payload as string };
    case GET_STOCKS_REQUEST:
      return { ...state, stocksLoading: true, stocksError: null };

    case GET_STOCKS_SUCCESS:
      return { ...state, stocks: action.payload as Stock[], stocksLoading: false, stocksError: null };

    case GET_STOCKS_FAILURE:
      return { ...state, stocksLoading: false, stocksError: action.payload as string };
    case GET_USERS_REQUEST:
      return { ...state, usersLoading: true, usersError: null };

    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload as User[], usersLoading: false, usersError: null };

    case GET_USERS_FAILURE:
      return { ...state, usersLoading: false, usersError: action.payload as string };

    case GET_COURSES_REQUEST:
      return { ...state, coursesLoading: true, coursesError: null };

    case GET_COURSES_SUCCESS:
      return { ...state, courses: action.payload as Course[], coursesLoading: false, coursesError: null };

    case GET_COURSES_FAILURE:
      return { ...state, coursesLoading: false, coursesError: action.payload as string };

    case GET_QR_CODES_REQUEST:
      return { ...state, qrCodesLoading: true, qrCodesError: null };

    case GET_QR_CODES_SUCCESS:
      return { ...state, qrCodes: action.payload as QrCode[], qrCodesLoading: false, qrCodesError: null };

    case GET_QR_CODES_FAILURE:
      return { ...state, qrCodesLoading: false, qrCodesError: action.payload as string };

    case USER_LOGIN_REQUEST:
    case USER_GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        token: null,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };

    case USER_LOGIN_COMPLETED: {
      const payload = action.payload as AuthResponse;
      return {
        ...state,
        data: payload,
        token:
          payload?.token ??
          payload?.data?.token ??
          null,
        isLoading: false,
        isError: false,
      };
    }

    case USER_LOGIN_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload as string,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
        registerError: false,
      };
    case USER_REGISTER_COMPLETED:
      return {
        ...state,
        registerData: action.payload as RegisterResponse,
        registerLoading: false,
        registerError: false,
      };

    case USER_LOGIN_RESET:
    case LOGIN_RESET:
    case USER_LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = (payload: { email: string; password: string }) => ({
  type: USER_LOGIN,
  payload,
});

export const userGoogleLogin = () => ({
  type: USER_GOOGLE_LOGIN,
});


export const resetLogin = () => ({
  type: USER_LOGIN_RESET
});

export const userRegister = (payload: { email: string; password: string; firstName: string; lastName: string }) => ({
  type: USER_REGISTER,
  payload,
});

export const resetRegister = () => ({
  type: USER_REGISTER_RESET,
});

export const getProducts = (payload: string) => ({
  type: GET_PRODUCTS_REQUEST,
  payload,
});

export const getStocks = (payload: string) => ({
  type: GET_STOCKS_REQUEST,
  payload,
});

export const getUsers = (payload: string) => ({
  type: GET_USERS_REQUEST,
  payload,
});

export const getCourses = (payload: string) => ({
  type: GET_COURSES_REQUEST,
  payload,
});

export const getQrCodes = (payload: string) => ({
  type: GET_QR_CODES_REQUEST,
  payload,
});