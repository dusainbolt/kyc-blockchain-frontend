import { createAction, createSlice } from '@reduxjs/toolkit';
import { SeoHome } from '@src/types/seoHomeType';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: SeoHome = {};

const hydrate = createAction<AppState>(HYDRATE);

export const seoHomeSlice = createSlice({
  name: 'seoHomeSlice',
  initialState,
  reducers: {
    getSeoHomeStart: (state: SeoHome, action: any) => ({ ...state, id: "123213" }),
    getSeoHomeSuccess: (state: SeoHome, action: any) => ({ ...state, ...action.payload }),
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

export const { getSeoHomeSuccess, getSeoHomeStart } = seoHomeSlice.actions;

export default seoHomeSlice.reducer;
