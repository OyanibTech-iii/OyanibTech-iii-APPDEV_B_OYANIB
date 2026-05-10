import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  authLogin,
  userRegister,
  getProducts,
  getStocks,
  getUsers,
  getCourses,
  getUserQrCodes,
} from '../api/auth';
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import {
  AuthResponse,
  RegisterResponse,
  Product,
  Stock,
  User,
  Course,
  QrCode,
} from '../../utils/types';

import {
  USER_LOGIN,
  USER_GOOGLE_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  GET_STOCKS_SUCCESS,
  GET_STOCKS_REQUEST,
  GET_STOCKS_FAILURE,
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAILURE,
  GET_COURSES_SUCCESS,
  GET_COURSES_REQUEST,
  GET_COURSES_FAILURE,
  GET_QR_CODES_SUCCESS,
  GET_QR_CODES_REQUEST,
  GET_QR_CODES_FAILURE,
} from '../actions';

export function* userLoginAsync(action: {
  type: string;
  payload: { email: string; password: string };
}): SagaIterator {
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    const data = (yield call(authLogin, action.payload)) as AuthResponse;

    if (data) {
      console.log('Saga received data, dispatching COMPLETED:', data);
      yield put({ type: USER_LOGIN_COMPLETED, payload: data });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Login failed';
    console.error('Saga Login Error:', errorMessage);
    yield put({ type: USER_LOGIN_ERROR, payload: errorMessage });
  }
}

export function* userGoogleLoginAsync(): SagaIterator {
  yield put({ type: USER_GOOGLE_LOGIN_REQUEST });
  try {
    yield call([GoogleSignin, 'hasPlayServices']);
    const userInfo = (yield call([GoogleSignin, 'signIn'])) as GoogleUser;
    console.log('Google User Info:', userInfo);
    yield put({
      type: USER_LOGIN_COMPLETED,
      payload: { user: userInfo.user, token: userInfo.idToken },
    });
  } catch (error: unknown) {
    const googleError = error as { code?: string; message?: string };
    if (googleError.code === statusCodes.SIGN_IN_CANCELLED) {
      yield put({
        type: USER_LOGIN_ERROR,
        payload: 'Google sign-in cancelled',
      });
    } else if (googleError.code === statusCodes.IN_PROGRESS) {
      yield put({
        type: USER_LOGIN_ERROR,
        payload: 'Google sign-in already in progress',
      });
    } else if (googleError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      yield put({
        type: USER_LOGIN_ERROR,
        payload: 'Play services not available',
      });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'Google login failed';
      yield put({ type: USER_LOGIN_ERROR, payload: `${errorMessage} (Code: ${googleError.code || 'unknown'})` });
    }
    console.error('Saga Google Login Error:', error);
  }
}
export function* userRegisterAsync(action: {
  type: string;
  payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}): SagaIterator {
  yield put({ type: USER_REGISTER_REQUEST });
  try {
    const response = (yield call(userRegister, action.payload)) as RegisterResponse;
    yield put({ type: USER_REGISTER_COMPLETED, payload: response });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Registration failed';
    yield put({ type: USER_REGISTER_ERROR, payload: errorMessage });
    console.log('Saga Register Error:', errorMessage);
  }
}

export function* getProductsAsync(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const data = (yield call(getProducts, action.payload)) as Product[];
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch products';
    yield put({ type: GET_PRODUCTS_FAILURE, payload: errorMessage });
  }
}

export function* getStocksAsync(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const data = (yield call(getStocks, action.payload)) as Stock[];
    yield put({ type: GET_STOCKS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch stocks';
    yield put({ type: GET_STOCKS_FAILURE, payload: errorMessage });
  }
}

export function* getUsersAsync(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const data = (yield call(getUsers, action.payload)) as User[];
    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch users';
    yield put({ type: GET_USERS_FAILURE, payload: errorMessage });
  }
}

export function* getCoursesAsync(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const data = (yield call(getCourses, action.payload)) as Course[];
    yield put({ type: GET_COURSES_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch courses';
    yield put({ type: GET_COURSES_FAILURE, payload: errorMessage });
  }
}

export function* getQrCodesAsync(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const data = (yield call(getUserQrCodes, action.payload)) as QrCode[];
    yield put({ type: GET_QR_CODES_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch QR codes';
    yield put({ type: GET_QR_CODES_FAILURE, payload: errorMessage });
  }
}

export function* watchGetProducts(): SagaIterator {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsAsync);
}

export function* watchUserLogin(): SagaIterator {
  yield takeEvery(USER_LOGIN, userLoginAsync);
  yield takeEvery(USER_GOOGLE_LOGIN, userGoogleLoginAsync);
}

export function* watchUserRegister(): SagaIterator {
  yield takeEvery(USER_REGISTER, userRegisterAsync);
}

export function* watchGetStocks(): SagaIterator {
  yield takeEvery(GET_STOCKS_REQUEST, getStocksAsync);
}

export function* watchGetUsers(): SagaIterator {
  yield takeEvery(GET_USERS_REQUEST, getUsersAsync);
}

export function* watchGetCourses(): SagaIterator {
  yield takeEvery(GET_COURSES_REQUEST, getCoursesAsync);
}

export function* watchGetQrCodes(): SagaIterator {
  yield takeEvery(GET_QR_CODES_REQUEST, getQrCodesAsync);
}
