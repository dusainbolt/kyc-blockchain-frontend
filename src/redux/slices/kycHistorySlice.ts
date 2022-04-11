/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { SearchKycHistoryAction, SearchKycHistorySuccessAction } from '@redux/action/kycHistoryAction';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { KycHistorySlice } from '@type/kycHistory';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: KycHistorySlice = {
  loadingData: true,
  data: [],
  paging: {},
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'kycHistorySlice';

const kycHistorySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    searchKycHistoryStart: (state: KycHistorySlice, { payload }: SearchKycHistoryAction) => {
      state.paging.currentPage = payload.page;
      state.paging.pageSize = payload.pageSize;
      state.loadingData = true;
    },
    searchKycHistorySuccess: (state: KycHistorySlice, { payload }: SearchKycHistorySuccessAction) => {
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

export const getKycHistorySlice = (state: RootState): KycHistorySlice => state[sliceName];

export const { searchKycHistoryStart, searchKycHistorySuccess } = kycHistorySlice.actions;

export default kycHistorySlice.reducer;
