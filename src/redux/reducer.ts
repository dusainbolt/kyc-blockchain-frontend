import { combineReducers } from '@reduxjs/toolkit';
import authenSlice from './slices/authentication';
import seoHomeSlice from './slices/seoHomeSlice';

export const whitelist = [];

export const rootReducer = combineReducers({ seoHomeSlice, authenSlice });

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
