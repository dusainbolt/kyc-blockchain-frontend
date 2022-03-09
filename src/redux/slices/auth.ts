/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { AddUserAction, UpdateUsersAction } from '@redux/action/authtication';
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
    loginStart: (state: AuthSlice, { payload }) => {
      state.loadingLogin = true;
    },
    // addUser: (state: AuthSlice, action: AddUserAction) => {
    //   state.users.push(action.payload);
    // },
    // setCurrentUser: (state: AuthSlice, action: AddUserAction) => {
    //   state.currentUser = action.payload;
    // },
    // updateUsers: (state: AuthSlice, action: UpdateUsersAction) => {
    //   state.users = action.payload;
    // },
    // disconnectUser: (state: AuthSlice) => {
    //   state.currentUser = {} as any;
    // },
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

export const { loginStart } = authSlice.actions;

export default persistReducer(
  getPersistConfig('authSlice', { whitelist: ['users', 'currentUser'] }),
  authSlice.reducer
);
