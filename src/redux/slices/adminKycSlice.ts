/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { SearchKycAction, SearchKycSuccessAction } from '@redux/action/adminKycAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { AdminKycSlice } from '@type/adminKyc';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: AdminKycSlice = {
  loadingData: true,
  data: [],
  paging: {},
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'adminKycSlice';

const adminKycSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    searchKycStart: (state: AdminKycSlice, { payload }: SearchKycAction) => {
      state.paging.currentPage = payload.page;
      state.paging.pageSize = payload.pageSize;
      state.loadingData = true;
    },
    searchKycSuccess: (state: AdminKycSlice, { payload }: SearchKycSuccessAction) => {
      state.paging = payload.paging;
      state.data = payload.data;
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

export const getAdminKycSlice = (state: RootState): AdminKycSlice => state[sliceName];

export const { searchKycStart, searchKycSuccess } = adminKycSlice.actions;

export default persistReducer(
  getPersistConfig(sliceName, { whitelist: ['address', 'token', 'role'] }),
  adminKycSlice.reducer
);
