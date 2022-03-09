// import { ErrorSaga, NotifySystem, TypeNotify } from '@Models/LayoutModel';
import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
// import WatchLoginSaga from './sagas/loginSaga';
// import seoHomeSaga from './sagas/seoHomeSaga';
// import watchTagSaga from './sagas/tagSaga';
// import { setNotifySlice } from './slices/layoutSlice';

export default function* rootSaga(): any {
  yield all([authSaga()]);
}

// export function* handleMessageErrorSaga(error: ErrorSaga): any {
//   yield console.log('Catch Error: ', error);
//   yield put(
//     setNotifySlice({
//       messageNotify: error.message,
//       typeNotify: TypeNotify.ERROR,
//       createTime: new Date().getTime(),
//     } as NotifySystem)
//   );
// }
// export function* handleMessageSuccessSaga(messageNotify: string): any {
//   yield put(
//     setNotifySlice({ messageNotify, typeNotify: TypeNotify.SUCCESS, createTime: new Date().getTime() } as NotifySystem)
//   );
// }
