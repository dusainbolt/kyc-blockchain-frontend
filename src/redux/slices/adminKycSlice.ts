/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { LoginAction, LoginSuccess } from '@redux/action/authAction';
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

const adminKycSlice = createSlice({
  name: 'adminKycSlice',
  initialState,
  reducers: {
    searchKycStart: (state: AdminKycSlice, { payload }: LoginAction) => {},
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.adminKycSlice,
      };
    });
  },
});

export const getAdminKycSlice = (state: RootState): AdminKycSlice => state.adminKycSlice;

export const { searchKycStart } = adminKycSlice.actions;

export default persistReducer(
  getPersistConfig('adminKycSlice', { whitelist: ['address', 'token', 'role'] }),
  adminKycSlice.reducer
);
