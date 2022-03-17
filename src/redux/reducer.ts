import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import walletSlice from './slices/walletSlice';
import profileSlice from './slices/profileSlice';
import layoutSlice from './slices/layoutSlice';
import adminKycSlice from './slices/adminKycSlice';

export const whitelist = [];

export const rootReducer = combineReducers({ authSlice, walletSlice, profileSlice, layoutSlice, adminKycSlice });

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
