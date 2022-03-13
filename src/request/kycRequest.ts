import { Profile } from '@type/profile';
import axios from './axios';

export const createKycAPI = async (body: Profile) => {
  return await axios.post('/kyc/create', body);
};

export const updateKycAPI = async (body: Profile) => {
  return await axios.put('/kyc/update', body);
};

export const getKycInfoAPI = async () => {
  return await axios.get('/kyc/info');
};
