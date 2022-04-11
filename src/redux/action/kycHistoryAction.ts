import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';

export type SearchKycHistoryAction = Record<PayloadName, querySearchDefault>;
export type SearchKycHistorySuccessAction = Record<PayloadName, SearchResponse>;
