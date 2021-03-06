import { SearchKycParams } from '@redux/action/adminKycAction';
import { CreateProjectBody, GetProjectParams } from '@redux/action/projectAction';
import axios from './axios';

export const searchProjectAPI = async (params: SearchKycParams) => {
  return await axios.get('/project/search', params);
};

export const createProjectAPI = async (body: CreateProjectBody) => {
  return await axios.post('/project/create', body);
};

export const getProjectAPI = async (params: GetProjectParams) => {
  return await axios.get('/project', params);
};
