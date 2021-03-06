import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';
import { Profile } from '@type/profile';
import { ProfileStatus } from '@type/user';

export type SearchKycParams = querySearchDefault & { email?: string };

export type SearchKycAction = Record<PayloadName, SearchKycParams>;
export type SearchKycSuccessAction = Record<PayloadName, SearchResponse>;

export type ConfirmKycBody = {
  kycId: string;
  status: ProfileStatus;
  message?: string;
  index?: number;
};

export type ConfirmKycAction = Record<PayloadName, ConfirmKycBody>;

export type ConfirmKycSuccessAction = Record<PayloadName, { profile: Profile; index: number }>;
