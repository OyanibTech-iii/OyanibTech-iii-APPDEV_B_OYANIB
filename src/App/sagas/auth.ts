import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authLogin, userRegister, getProducts, getStocks, getUsers } from '../api/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

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
} from '../actions';

export function* userLoginAsync(action: { payload: { email: string; password: string; }; }):SagaIterator {
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    const data = yield call(authLogin, action.payload);

    if (data) {
      console.log("Saga received data, dispatching COMPLETED:", data);
      yield put({ type: USER_LOGIN_COMPLETED, payload: data });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    console.error("Saga Login Error:", errorMessage);
    yield put({ type: USER_LOGIN_ERROR, payload: errorMessage });
  }
}

export function* userGoogleLoginAsync(): SagaIterator {
  yield put({ type: USER_GOOGLE_LOGIN_REQUEST });
  try {
    yield call([GoogleSignin, 'hasPlayServices']);
    const userInfo = yield call([GoogleSignin, 'signIn']);
    console.log("Google User Info:", userInfo);
    // Here you would typically send userInfo.idToken to your backend
    // Since we don't have a backend endpoint for this, we'll simulate success
    // Or if the backend has one, we'd call it.
    
    // For now, let's treat the google user as the logged in user
    yield put({ type: USER_LOGIN_COMPLETED, payload: { user: userInfo.user, token: userInfo.idToken } });
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      yield put({ type: USER_LOGIN_ERROR, payload: 'Google sign-in cancelled' });
    } else if (error.code === statusCodes.IN_PROGRESS) {
      yield put({ type: USER_LOGIN_ERROR, payload: 'Google sign-in already in progress' });
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      yield put({ type: USER_LOGIN_ERROR, payload: 'Play services not available' });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      yield put({ type: USER_LOGIN_ERROR, payload: errorMessage });
    }
    console.error("Saga Google Login Error:", error);
  }
}
export function* userRegisterAsync(action: { payload: { email: string; password: string; firstName: string; lastName: string; }; }): SagaIterator {
  yield put({ type: USER_REGISTER_REQUEST });
  try {
    const response = yield call(userRegister, action.payload);
    yield put({ type: USER_REGISTER_COMPLETED, payload: response });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    yield put({ type: USER_REGISTER_ERROR, payload: errorMessage });
    console.log("Saga Register Error:", errorMessage);
  }
}

export function* getProductsAsync(action: { payload: string; }): SagaIterator {
  try {
    const data = yield call(getProducts, action.payload);
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
    yield put({ type: GET_PRODUCTS_FAILURE, payload: errorMessage });
  }
}

export function* getStocksAsync(action: { payload: string; }): SagaIterator {
  try {
    const data = yield call(getStocks, action.payload);
    yield put({ type: GET_STOCKS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stocks';
    yield put({ type: GET_STOCKS_FAILURE, payload: errorMessage });
  }
}

export function* getUsersAsync(action: { payload: string; }): SagaIterator {
  try {
    const data = yield call(getUsers, action.payload);
    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
    yield put({ type: GET_USERS_FAILURE, payload: errorMessage });
  }
}

export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsAsync);
}

export function* userLogin() {
  yield takeEvery(USER_LOGIN, userLoginAsync);
  yield takeEvery(USER_GOOGLE_LOGIN, userGoogleLoginAsync);
}

export function* watchUserRegister() {
  yield takeEvery(USER_REGISTER, userRegisterAsync);
}

export function* watchGetStocks() {
  yield takeEvery(GET_STOCKS_REQUEST, getStocksAsync);
}

export function* watchGetUsers() {
  yield takeEvery(GET_USERS_REQUEST, getUsersAsync);
}