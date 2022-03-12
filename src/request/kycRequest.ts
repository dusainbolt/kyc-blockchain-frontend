import { ProfileData } from '@type/profile';
import axios from './axios';

export const createKycAPI = async (body: ProfileData) => {
  return await axios.post('/kyc/create', body);
};

export const getKycInfoAPI = async () => {
  return await axios.get('/kyc/info');
};
