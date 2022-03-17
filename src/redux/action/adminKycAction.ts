import { PayloadName } from '@redux/reducer';
import { SearchResponse } from '@type/context';

export type SearchKycParams = { page: number; pageSize: number; sortBy?: string } & { email?: string };

export type SearchKycAction = Record<PayloadName, SearchKycParams>;
export type SearchKycSuccessAction = Record<PayloadName, SearchResponse>;
