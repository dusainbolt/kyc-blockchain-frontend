import { Paging } from './context';
import { Profile } from './profile';

export type AdminKycSlice = {
  data: Profile[];
  paging: Paging;
  loadingData: boolean;
};
