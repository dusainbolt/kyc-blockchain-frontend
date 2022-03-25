import { SearchKycParams } from '@redux/action/adminKycAction';
import axios from './axios';

export const searchKycHistoryAPI = async (params: SearchKycParams) => {
  return await axios.get('/kyc-history/search', params);
};
