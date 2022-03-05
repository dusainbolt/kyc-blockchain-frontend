// import { AddUserAction, UpdateUsersAction } from '@redux/action/authentication';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { WalletSlice } from '@type/wallet';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: WalletSlice = {
  address: '',
  type: null,
  balance: 0,
  chainId: 0,
};

const hydrate = createAction<AppState>(HYDRATE);

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState,
  reducers: {
    // addUser: (state: AuthenSlice, action: AddUserAction) => {
    //   state.users.push(action.payload);
    // },
    // setCurrentUser: (state: AuthenSlice, action: AddUserAction) => {
    //   state.currentUser = action.payload;
    // },
    // updateUsers: (state: AuthenSlice, action: UpdateUsersAction) => {
    //   state.users = action.payload;
    // },
    // disconnectUser: (state: AuthenSlice) => {
    //   state.currentUser = {} as any;
    // },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.walletSlice,
      };
    });
  },
});

export const getWalletSlice = (state: RootState): WalletSlice => state.walletSlice;

// export const { addUser, setCurrentUser, updateUsers, disconnectUser } = authenSlice.actions;

export default persistReducer(getPersistConfig('walletSlice'), walletSlice.reducer);
