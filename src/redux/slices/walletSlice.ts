// import { AddUserAction, UpdateUsersAction } from '@redux/action/authentication';
import { ChooseWalletAction, ReceiveWalletAction } from '@redux/action/walletAction';
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
  connected: false,
};

const hydrate = createAction<AppState>(HYDRATE);

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState,
  reducers: {
    chooseWallet: (state: WalletSlice, { payload }: ChooseWalletAction) => {
      state.type = payload;
    },
    receiveWallet: (state: WalletSlice, { payload }: ReceiveWalletAction) => {
      state.address = payload.account;
      state.chainId = payload.chainId;
      state.connected = true;
    },
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

export const { chooseWallet, receiveWallet } = walletSlice.actions;

export default persistReducer(getPersistConfig('walletSlice'), walletSlice.reducer);
