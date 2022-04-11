import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';

export type SearchKycSharedAction = Record<PayloadName, querySearchDefault>;
export type SearchKycSharedSuccessAction = Record<PayloadName, SearchResponse>;
