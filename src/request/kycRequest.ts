import { SearchKycParams, ConfirmKycBody } from '@redux/action/adminKycAction';
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

export const searchKycAPI = async (params: SearchKycParams) => {
  return await axios.get('/kyc/search', params);
};

export const requestKycAPI = async () => {
  return await axios.patch('/kyc/request');
};

export const confirmKycAPI = async (body: ConfirmKycBody) => {
  return await axios.patch('/kyc/confirm', body);
};

export const requestDeployAPI = async () => {
  return await axios.get('/kyc/request_deploy');
};
