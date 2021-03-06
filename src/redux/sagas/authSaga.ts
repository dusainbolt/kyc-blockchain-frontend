import { LoginAction } from '@redux/action/authAction';
import { loginError, loginStart, loginSuccess, logout } from '@redux/slices/authSlice';
import { logoutProfile } from '@redux/slices/profileSlice';
import { disconnectWallet } from '@redux/slices/walletSlice';
import axios from '@request/axios';
import Constant from '@services/constant';
import { put, takeEvery } from 'redux-saga/effects';
import { loginAPI } from 'src/request/userRequest';

function* watchLoginStart({ payload }: LoginAction) {
  try {
    const response = yield loginAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(loginSuccess(response.data));
      yield axios.setTokenRequest(response.data?.token as any);
    } else {
      yield put(loginError());
    }
  } catch (error: any) {
    yield put(loginError());
  }
}

function* watchLogout() {
  try {
    yield put(disconnectWallet());
    yield put(logoutProfile());
  } catch (error: any) {
    yield put(loginError());
  }
}

export default function* authSaga(): any {
  yield takeEvery(loginStart, watchLoginStart);
  yield takeEvery(logout, watchLogout);
}
