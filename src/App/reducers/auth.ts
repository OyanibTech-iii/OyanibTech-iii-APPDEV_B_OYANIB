import { AuthState } from '../../utils/types';
import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  LOGIN_RESET,
  USER_LOGIN_RESET,
  USER_REGISTER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_RESET,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_STOCKS_REQUEST,
  GET_STOCKS_SUCCESS,
  GET_STOCKS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
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
};

interface AuthAction {
  type: string;
  payload?: any; 
}

export default function reducer(state = INITIAL_STATE, action: AuthAction): AuthState {
  console.log(action.type);
  switch (action.type) {

    case GET_PRODUCTS_REQUEST:
      return { ...state, productsLoading: true, productsError: null };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, productsLoading: false, productsError: null };

    case GET_PRODUCTS_FAILURE:
      return { ...state, productsLoading: false, productsError: action.payload };
    case GET_STOCKS_REQUEST:
      return { ...state, stocksLoading: true, stocksError: null };

    case GET_STOCKS_SUCCESS:
      return { ...state, stocks: action.payload, stocksLoading: false, stocksError: null };

    case GET_STOCKS_FAILURE:
      return { ...state, stocksLoading: false, stocksError: action.payload };
    case GET_USERS_REQUEST:
      return { ...state, usersLoading: true, usersError: null };

    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, usersLoading: false, usersError: null };

    case GET_USERS_FAILURE:
      return { ...state, usersLoading: false, usersError: action.payload };

    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        token: null,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };

    case USER_LOGIN_COMPLETED:
      return {
        ...state,
        data: action.payload,
        token:
          action?.payload?.token ??
          action?.payload?.data?.token ??
          null,
        isLoading: false,
        isError: false,
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
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
        registerData: action.payload,
        registerLoading: false,
        registerError: false,
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: true,
        registerErrorMessage: action.payload,
      };

    case USER_REGISTER_RESET:
      return {
        ...state,
        registerData: null,
        registerLoading: false,
        registerError: false,
        registerErrorMessage: '',
      };

    case USER_LOGIN_RESET:
    case LOGIN_RESET:
    case USER_LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = (payload: unknown) => ({
  type: USER_LOGIN,
  payload,
});


export const resetLogin = () => ({
  type: USER_LOGIN_RESET
});

export const userRegister = (payload: unknown) => ({
  type: USER_REGISTER,
  payload,
});

export const resetRegister = () => ({
  type: USER_REGISTER_RESET,
});

export const getProducts = (payload: unknown) => ({
  type: GET_PRODUCTS_REQUEST,
  payload,
});

export const getStocks = (payload: unknown) => ({
  type: GET_STOCKS_REQUEST,
  payload,
});

export const getUsers = (payload: unknown) => ({
  type: GET_USERS_REQUEST,
  payload,
});
