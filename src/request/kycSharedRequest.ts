import { SearchKycParams } from '@redux/action/adminKycAction';
import { CheckKycParams } from '@redux/action/kycSharedAction';
import axios from './axios';

export const searchKycSharedAPI = async (params: SearchKycParams) => {
  return await axios.get('/kyc-shared/search', params);
};

export const checkKycSharedAPI = async (params: CheckKycParams) => {
  return await axios.get('/kyc-shared/check', params);
};
