import { updateProfileAction } from '@redux/action/profileAction';
import {
  getProfileError,
  getProfileStart,
  getProfileSuccess,
  updateProfileError,
  updateProfileStart,
  updateProfileSuccess,
} from '@redux/slices/profileSlice';
import { createKycAPI, getKycInfoAPI, updateKycAPI } from '@request/kycRequest';
import Constant from '@services/constant';
import { put, takeEvery } from 'redux-saga/effects';

function* watchGetProfile() {
  try {
    const response = yield getKycInfoAPI();
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(getProfileSuccess(response.data));
    } else {
      yield put(getProfileError());
    }
  } catch (error: any) {
    yield put(getProfileError());
  }
}

function* watchUpdateProfile({ payload }: updateProfileAction) {
  try {
    const response = yield payload._id ? updateKycAPI(payload) : createKycAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(updateProfileSuccess());
      yield put(getProfileStart());
    } else {
      yield put(updateProfileError());
    }
  } catch (error: any) {
    yield put(updateProfileError());
  }
}

export default function* profileSaga(): any {
  yield takeEvery(getProfileStart, watchGetProfile);
  yield takeEvery(updateProfileStart, watchUpdateProfile);
}
