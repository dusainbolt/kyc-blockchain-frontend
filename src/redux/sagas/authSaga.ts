// import { getSeoHomeRequest } from '@GraphQL/seoHomeRequest';
// import { SeoHome } from 'src/types/SeoHomeModel';
// import { put, takeEvery, all, fork } from 'redux-saga/effects';
// import { getSeoHomeStart } from '../slices/seoHomeSlice';
// // import { getSeoHomeStart, getSeoHomeSuccess } from '@Redux/slices/seoHomeSlice';

import { LoginAction } from '@redux/action/authAction';
import { loginStart } from '@redux/slices/auth';
import { takeEvery } from 'redux-saga/effects';
import { loginAPI } from 'src/request/userRequest';

function* watchLoginStart({ payload }: LoginAction) {
  try {
    const result = yield loginAPI(payload);
    console.log('result', result);
  } catch (error: any) {
    console.log('error: ', error);
  }
}

export default function* authSaga(): any {
  yield takeEvery(loginStart, watchLoginStart);
}
