import { SearchKycAction } from '@redux/action/adminKycAction';
import { CheckSharedKycAction } from '@redux/action/kycSharedAction';
import {
  checkKycSharedStart,
  checkKycSharedSuccess,
  searchKycSharedStart,
  searchKycSharedSuccess,
} from '@redux/slices/kycSharedSlice';
import { checkKycSharedAPI, searchKycSharedAPI } from '@request/kycSharedRequest';
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

function* watchCheckKycShared({ payload }: CheckSharedKycAction) {
  try {
    const response = yield checkKycSharedAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(checkKycSharedSuccess(response.data));
    } else {
      yield put(checkKycSharedSuccess({}));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

export default function* kycSharedSaga(): any {
  yield takeEvery(searchKycSharedStart, watchSearchKycShared);
  yield takeEvery(checkKycSharedStart, watchCheckKycShared);
}
