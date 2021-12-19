import { combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gallerySlice from './slices/gallerySlice';
import seoHomeSlice from './slices/seoHomeSlice';
// import seoHomeReducer from './slices/seoHomeSlice';

export const getPersistConfig = (key = '', nested = {}): any => {
  return {
    key,
    storage: storage,
    ...nested,
  };
};

export const whitelist = [];

export const rootReducer = combineReducers({ seoHomeSlice, gallerySlice });

export type RootState = ReturnType<typeof rootReducer>;
