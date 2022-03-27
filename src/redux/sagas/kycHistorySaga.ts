import { SearchKycAction } from '@redux/action/adminKycAction';
import { searchKycHistoryStart, searchKycHistorySuccess } from '@redux/slices/kycHistorySlice';
import { searchKycHistoryAPI } from '@request/kycHistoryRequest';
import Constant from '@services/constant';
import { delay, put, takeEvery } from 'redux-saga/effects';

function* watchSearchKycHistory({ payload }: SearchKycAction) {
  try {
    const response = yield searchKycHistoryAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield delay(1000);
      yield put(searchKycHistorySuccess(response.data));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

export default function* kycHistorySaga(): any {
  yield takeEvery(searchKycHistoryStart, watchSearchKycHistory);
}
