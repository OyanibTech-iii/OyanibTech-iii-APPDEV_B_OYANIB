
import { all } from 'redux-saga/effects';
import { userLogin, watchUserRegister, watchGetProducts, watchGetStocks, watchGetUsers } from './auth';

export default function* rootSaga() {
  yield all([userLogin(), watchUserRegister(), watchGetProducts(), watchGetStocks(), watchGetUsers()]);
}
