import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import walletSlice from './slices/walletSlice';

export const whitelist = [];

export const rootReducer = combineReducers({ authSlice, walletSlice });

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
