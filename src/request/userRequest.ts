import { LoginParams } from '@redux/action/authAction';
import req from './axios';

export const loginAPI = async (body: LoginParams) => {
  return await req.post('/user/login', body);
};
