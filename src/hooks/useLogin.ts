import { getAuthenSlice, setCurrentUser } from '@redux/slices/authentication';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Hash from '@services/hash';
import Helper from '@services/helper';
import Validate from '@services/validate';
import { LoginInput, loginField, LoginValidate } from '@type/authentication';
import { useState } from 'react';
import * as yup from 'yup';

interface UseLogin {
  handleLogin: (values: LoginInput) => void;
  initialFormLogin: LoginInput;
  validateFormLogin: any;
  loadingSubmitLogin: boolean;
  errorMessage: string;
}

export const useLogin = (): UseLogin => {
  const dispatch = useAppDispatch();
  const authenSlice = useAppSelector(getAuthenSlice);
  const [loadingSubmitLogin, setLoadingSubmitLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const initialFormLogin: LoginInput = {
    username: '',
    password: '',
  };

  const validateFormLogin: LoginValidate = {
    username: yup
      .string()
      .required(Validate.require(loginField.username.label))
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21)),
    password: yup
      .string()
      .required(Validate.require(loginField.password.label))
      .matches(Validate.regexPassword, Validate.security(loginField.password.label))
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21)),
  };

  const handleLogin = async (values: LoginInput) => {
    setLoadingSubmitLogin(true);
    await Helper.delay(1500);
    const user = authenSlice.users.find((item) => item.username === values.username);
    if (!user?.username) {
      setErrorMessage(Validate.userOrPasswordError);
    } else {
      const password = Hash.decryptAES(user.password);
      if (password === values.password) {
        dispatch(setCurrentUser(user));
      } else {
        setErrorMessage(Validate.userOrPasswordError);
      }
    }
    setLoadingSubmitLogin(false);
  };

  return { handleLogin, initialFormLogin, validateFormLogin, loadingSubmitLogin, errorMessage };
};

export const useRedirectAuthen = () => {
  const currentUser = useAppSelector(getAuthenSlice).currentUser;
  const isClient = typeof window !== 'undefined';
  if (currentUser?.username && isClient) {
    window.open('/', '_self');
  }
};
