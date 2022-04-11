import { Paging } from './context';
import { ProfileStatus } from './user';

export type KycHistory = {
  _id?: string;
  kycId?: string;
  userId?: string;
  status?: ProfileStatus;
  message?: string;
  updatedAt?: string;
};

export type KycHistorySlice = {
  data: KycHistory[];
  paging: Paging;
  loadingData: boolean;
};
