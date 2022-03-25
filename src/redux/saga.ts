import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import profileSaga from './sagas/profileSaga';
import adminKycSaga from './sagas/adminKycSaga';
import kycHistorySaga from './sagas/kycHistorySaga';

export default function* rootSaga(): any {
  yield all([authSaga(), profileSaga(), adminKycSaga(), kycHistorySaga()]);
}
