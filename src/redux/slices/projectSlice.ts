/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  CreateProjectAction,
  CreateProjectSuccessAction,
  SearchProjectAction,
  SearchProjectSuccessAction,
} from '@redux/action/projectAction';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { ProjectSlice } from '@type/project';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: ProjectSlice = {
  loadingData: true,
  data: [],
  paging: {},
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'projectSlice';

const projectSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    searchProjectStart: (state: ProjectSlice, { payload }: SearchProjectAction) => {
      state.paging.currentPage = payload.page;
      state.paging.pageSize = payload.pageSize;
      state.loadingData = true;
    },
    searchProjectSuccess: (state: ProjectSlice, { payload }: SearchProjectSuccessAction) => {
      state.paging = payload.paging;
      state.data = payload.data;
      state.loadingData = false;
    },
    createProjectStart: (state: ProjectSlice, { payload }: CreateProjectAction) => {
      state.loadingData = !!payload.name;
    },
    createProjectSuccess: (state: ProjectSlice, { payload }: CreateProjectSuccessAction) => {
      state.loadingData = false;
      state.data.unshift(payload);
    },
    createProjectError: (state: ProjectSlice) => {
      state.loadingData = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName],
      };
    });
  },
});

export const getProjectSlice = (state: RootState): ProjectSlice => state[sliceName];

export const {
  searchProjectStart,
  searchProjectSuccess,
  createProjectStart,
  createProjectSuccess,
  createProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;
