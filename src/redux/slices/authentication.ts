import { AddUserAction } from '@redux/action/authentication';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { AuthenSlice } from '@type/authentication';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: AuthenSlice = {
  users: [],
};

const hydrate = createAction<AppState>(HYDRATE);

export const authenSlice = createSlice({
  name: 'authenSlice',
  initialState,
  reducers: {
    addUser: (state: AuthenSlice, action: AddUserAction) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state: AuthenSlice, action: AddUserAction) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.authenSlice,
      };
    });
  },
});

export const getAuthenSlice = (state: RootState): AuthenSlice => state.authenSlice;

export const { addUser, setCurrentUser } = authenSlice.actions;

export default persistReducer(
  getPersistConfig('authenSlice', { whitelist: ['users', 'currentUser'] }),
  authenSlice.reducer
);
