import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import walletSlice from './slices/walletSlice';
import profileSlice from './slices/profileSlice';
import layoutSlice from './slices/layoutSlice';

export const whitelist = [];

export const rootReducer = combineReducers({ authSlice, walletSlice, profileSlice, layoutSlice });

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
