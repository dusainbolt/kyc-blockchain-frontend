import { SearchKycParams } from '@redux/action/adminKycAction';
import axios from './axios';

export const searchKycSharedAPI = async (params: SearchKycParams) => {
  return await axios.get('/kyc-shared/search', params);
};
