import { SearchKycParams } from '@redux/action/adminKycAction';
import { CreateProjectBody } from '@redux/action/projectAction';
import axios from './axios';

export const searchProjectAPI = async (params: SearchKycParams) => {
  return await axios.get('/project/search', params);
};

export const createProjectAPI = async (body: CreateProjectBody) => {
  return await axios.post('/project/create', body);
};
