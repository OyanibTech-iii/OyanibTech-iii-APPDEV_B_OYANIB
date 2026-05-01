import { all } from 'redux-saga/effects';
import {
  watchUserLogin,
  watchUserRegister,
  watchGetProducts,
  watchGetStocks,
  watchGetUsers,
  watchGetCourses,
} from './auth';

export default function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchUserRegister(),
    watchGetProducts(),
    watchGetStocks(),
    watchGetUsers(),
    watchGetCourses(),
  ]);
}
