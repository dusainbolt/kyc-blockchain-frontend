import { SearchKycAction } from '@redux/action/adminKycAction';
import { searchKycSharedStart, searchKycSharedSuccess } from '@redux/slices/kycSharedSlice';
import { searchKycSharedAPI } from '@request/kycSharedRequest';
import Constant from '@services/constant';
import { delay, put, takeEvery } from 'redux-saga/effects';

function* watchSearchKycShared({ payload }: SearchKycAction) {
  try {
    const response = yield searchKycSharedAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield delay(1000);
      yield put(searchKycSharedSuccess(response.data));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

export default function* kycSharedSaga(): any {
  yield takeEvery(searchKycSharedStart, watchSearchKycShared);
}
