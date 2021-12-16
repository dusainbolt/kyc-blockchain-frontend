import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: any = {};

const hydrate = createAction<AppState>(HYDRATE);

export const seoHomeSlice: any = createSlice({
  name: 'seoHomeSlice',
  initialState,
  reducers: {
    getSeoHomeSuccess: (state: any, action: any) => ({ ...state, ...action.payload }),
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.seoHomeSlice,
      };
    });
  },
});

export const getSeoHomeSlice = (state: RootState): any => state.seoHomeSlice;

export const { getSeoHomeSuccess } = seoHomeSlice.actions;

export default seoHomeSlice.reducer;
