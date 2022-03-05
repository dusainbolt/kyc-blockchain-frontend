import { combineReducers } from '@reduxjs/toolkit';
import authenSlice from './slices/authentication';
import walletSlice from './slices/walletSlice';

export const whitelist = [];

export const rootReducer = combineReducers({ authenSlice, walletSlice });

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
