/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { AddUserAction, UpdateUsersAction } from '@redux/action/authtication';
import { LoginAction, LoginSuccess } from '@redux/action/authAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { AuthSlice } from '@type/auth';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: AuthSlice = {
  loadingLogin: false,
};

const hydrate = createAction<AppState>(HYDRATE);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginStart: (state: AuthSlice, { payload }: LoginAction) => {
      state.loadingLogin = true;
      state.signature = payload.signature;
      state.role = payload.role;
    },
    loginSuccess: (state: AuthSlice, { payload }: LoginSuccess) => {
      state.loadingLogin = false;
      state.address = payload.address;
      state.token = payload.token;
    },
    loginError: (state: AuthSlice) => {
      state.loadingLogin = false;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.authSlice,
      };
    });
  },
});

export const getAuthSlice = (state: RootState): AuthSlice => state.authSlice;

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions;

export default persistReducer(
  getPersistConfig('authSlice', { whitelist: ['address', 'token', 'role'] }),
  authSlice.reducer
);
