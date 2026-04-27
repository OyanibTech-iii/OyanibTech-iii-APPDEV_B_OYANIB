
import { all } from 'redux-saga/effects';
import { userLogin, watchUserRegister } from './auth';

export default function* rootSaga() {
  yield all([userLogin(), watchUserRegister()]);
}