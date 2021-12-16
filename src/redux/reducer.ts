import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import seoHomeReducer from './slices/seoHomeSlice';

export const getPersistConfig = (key = '', nested = {}): any => {
  return {
    key,
    storage: storage,
    ...nested,
  };
};

export const whitelist = [];

const persistLoginSlice = persistReducer(
  getPersistConfig('loginSlice', { whitelist: ['token', 'user'] }),
  seoHomeReducer
);

export const rootReducer = combineReducers({ seoHomeReducer, loginSlice: persistLoginSlice });

export type RootState = ReturnType<typeof rootReducer>;
