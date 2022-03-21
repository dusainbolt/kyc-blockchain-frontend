import { ConfirmKycAction, SearchKycAction } from '@redux/action/adminKycAction';
import {
  confirmKycError,
  confirmKycStart,
  confirmKycSuccess,
  searchKycStart,
  searchKycSuccess,
} from '@redux/slices/adminKycSlice';
import { confirmKycAPI, searchKycAPI } from '@request/kycRequest';
import Constant from '@services/constant';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { number } from 'yup';

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

function* watchConfirmKyc({ payload }: ConfirmKycAction) {
  try {
    const response = yield confirmKycAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield delay(1000);
      yield put(confirmKycSuccess({ index: payload.index as number, profile: response.data }));
    }
  } catch (error: any) {
    yield put(confirmKycError());
  }
}

export default function* adminKycSaga(): any {
  yield takeEvery(searchKycStart, watchSearchKyc);
  yield takeEvery(confirmKycStart, watchConfirmKyc);
}
