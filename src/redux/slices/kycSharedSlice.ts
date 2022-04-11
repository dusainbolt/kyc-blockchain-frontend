/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { SearchKycSharedAction, SearchKycSharedSuccessAction } from '@redux/action/kycSharedAction';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { KycSharedSlice } from '@type/kycShared';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: KycSharedSlice = {
  loadingData: true,
  data: [],
  paging: {},
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'kycSharedSlice';

const kycSharedSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    searchKycSharedStart: (state: KycSharedSlice, { payload }: SearchKycSharedAction) => {
      state.paging.currentPage = payload.page;
      state.paging.pageSize = payload.pageSize;
      state.loadingData = true;
    },
    searchKycSharedSuccess: (state: KycSharedSlice, { payload }: SearchKycSharedSuccessAction) => {
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

export const getKycSharedSlice = (state: RootState): KycSharedSlice => state[sliceName];

export const { searchKycSharedStart, searchKycSharedSuccess } = kycSharedSlice.actions;

export default kycSharedSlice.reducer;
