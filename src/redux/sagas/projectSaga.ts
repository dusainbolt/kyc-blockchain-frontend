import { CreateProjectAction, GetProjectAction, SearchProjectAction } from '@redux/action/projectAction';
import {
  createProjectError,
  createProjectStart,
  createProjectSuccess,
  getProjectStart,
  getProjectSuccess,
  searchProjectStart,
  searchProjectSuccess,
} from '@redux/slices/projectSlice';
import { createProjectAPI, getProjectAPI, searchProjectAPI } from '@request/projectRequest';
import Constant from '@services/constant';
import { delay, put, takeEvery } from 'redux-saga/effects';

function* watchSearchProject({ payload }: SearchProjectAction) {
  try {
    const response = yield searchProjectAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield delay(1000);
      yield put(searchProjectSuccess(response.data));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

function* watchCreateProject({ payload }: CreateProjectAction) {
  try {
    const response = yield createProjectAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(createProjectSuccess(response.data));
    } else {
      yield put(createProjectError());
    }
  } catch (error: any) {
    yield put(createProjectError());
  }
}

function* watchGetProject({ payload }: GetProjectAction) {
  try {
    const response = yield getProjectAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(getProjectSuccess(response.data || {}));
    }
  } catch (error: any) {
    console.log('Error: ', error);
  }
}

export default function* projectSaga(): any {
  yield takeEvery(searchProjectStart, watchSearchProject);
  yield takeEvery(createProjectStart, watchCreateProject);
  yield takeEvery(getProjectStart, watchGetProject);
}
