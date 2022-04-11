import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';
import { KycShared } from '@type/kycShared';

export type CheckKycParams = {
  userAddress: string;
};

export type SearchKycSharedAction = Record<PayloadName, querySearchDefault>;
export type SearchKycSharedSuccessAction = Record<PayloadName, SearchResponse>;
export type CheckSharedKycAction = Record<PayloadName, CheckKycParams>;
export type checkSharedKycSuccess = Record<PayloadName, KycShared>;
