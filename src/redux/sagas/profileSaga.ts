import { getProfileError, getProfileStart, getProfileSuccess } from '@redux/slices/profileSlice';
import { getKycInfoAPI } from '@request/kycRequest';
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

export default function* profileSaga(): any {
  yield takeEvery(getProfileStart, watchGetProfile);
}
