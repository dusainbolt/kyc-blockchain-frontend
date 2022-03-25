import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';

export type SearchKycHistoryParams = querySearchDefault;

export type SearchKycHistoryAction = Record<PayloadName, SearchKycHistoryParams>;
export type SearchKycHistorySuccessAction = Record<PayloadName, SearchResponse>;
