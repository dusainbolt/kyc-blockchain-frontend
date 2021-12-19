import { createAction, createSlice } from '@reduxjs/toolkit';
import { SeoHome } from '@src/types/seoHomeType';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: SeoHome = {};

const hydrate = createAction<AppState>(HYDRATE);

export const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState,
  reducers: {
    getGalleryStart: (state: SeoHome, action: any) => ({ ...state, id: "123213" }),
    getGallerySuccess: (state: SeoHome, action: any) => ({ ...state, ...action.payload }),
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.gallerySlice,
      };
    });
  },
});

export const getGallerySlice = (state: RootState): any => state.gallerySlice;

export const { getGallerySuccess, getGalleryStart } = gallerySlice.actions;

// export default persistReducer(getPersistConfig('loginSlice', { whitelist: ['token', 'user'] }), gallerySlice.reducer);

export default gallerySlice.reducer;