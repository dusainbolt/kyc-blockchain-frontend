import { SearchKycAction } from '@redux/action/adminKycAction';
import { searchKycStart, searchKycSuccess } from '@redux/slices/adminKycSlice';
import { searchKycAPI } from '@request/kycRequest';
import Constant from '@services/constant';
import { delay, put, takeEvery } from 'redux-saga/effects';

function* watchSearchKyc({ payload }: SearchKycAction) {
  try {
    const response = yield searchKycAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield delay(1000);
      yield put(searchKycSuccess(response.data));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

export default function* adminKycSaga(): any {
  yield takeEvery(searchKycStart, watchSearchKyc);
}
