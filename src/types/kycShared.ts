import { Paging } from './context';
import { Project } from './project';

export type KycShared = {
  _id?: string;
  kycId?: string;
  userId?: string;
  projectId?: Project;
  updatedAt?: string;
  transactionHash?: string;
};

export type KycSharedSlice = {
  data: KycShared[];
  paging: Paging;
  loadingData: boolean;
};
