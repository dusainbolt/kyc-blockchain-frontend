import { PayloadName } from '@redux/reducer';
import { TypeWallet } from '@type/wallet';
// import { User } from '@type/user';

export type ReceiveWallet = {
  account: string;
  chainId: number | string;
};

export type ChooseWalletAction = Record<PayloadName, TypeWallet>;
export type ReceiveWalletAction = Record<PayloadName, ReceiveWallet>;

// export type UpdateUsersAction = Record<PayloadName, User[]>;
