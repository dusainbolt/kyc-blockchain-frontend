// import { AddUserAction, UpdateUsersAction } from '@redux/action/authtication';
import { ChooseWalletAction, ReceiveWalletAction } from '@redux/action/walletAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { TypeWallet, WalletSlice } from '@type/wallet';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: WalletSlice = {
  address: '',
  type: TypeWallet.METAMASK,
  processing: false,
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
      state.processing = true;
    },
    receiveWallet: (state: WalletSlice, { payload }: ReceiveWalletAction) => {
      state.address = payload.account;
      state.chainId = payload.chainId;
      state.connected = true;
    },
    disconnectWallet: () => {
      return initialState;
    },
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

export const { chooseWallet, receiveWallet, disconnectWallet } = walletSlice.actions;

export default persistReducer(getPersistConfig('walletSlice'), walletSlice.reducer);
