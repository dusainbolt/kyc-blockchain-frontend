import { getAuthSlice } from '@redux/slices/authtication';
import { getWalletSlice } from '@redux/slices/walletSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { WalletSignature } from '@type/wallet';
import { useState } from 'react';
import useWalletSignature from './useWalletSignature';
// import { NotificationManager } from 'react-notifications';

interface UseLogin {
  handleLogin: () => void;
  loadingLogin: boolean;
  // initialFormLogin: LoginInput;
  // validateFormLogin: any;
  // loadingSubmitLogin: boolean;
  // errorMessage: string;
}

export const useLogin = (WalletSignature: WalletSignature): UseLogin => {
  const { signMessage } = useWalletSignature();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const address = useAppSelector(getWalletSlice).address;

  const handleLogin = async () => {
    try {
      setLoadingLogin(true);
      const walletSignature: WalletSignature = await signMessage(address);
      if (walletSignature) {
      }
      console.log('walletSignature: ', walletSignature);
      setLoadingLogin(false);
    } catch (e) {
      console.log('e', e);
    }
  };
  // const dispatch = useAppDispatch();
  // const authSlice = useAppSelector(getAuthSlice);
  // const [loadingSubmitLogin, setLoadingSubmitLogin] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>('');
  // const initialFormLogin: LoginInput = {
  //   username: '',
  //   password: '',
  // };
  // const validateFormLogin: LoginValidate = {
  //   username: yup
  //     .string()
  //     .required(Validate.require(loginField.username.label))
  //     .min(8, Validate.during(8, 21))
  //     .max(21, Validate.during(8, 21)),
  //   password: yup
  //     .string()
  //     .required(Validate.require(loginField.password.label))
  //     .matches(Validate.regexPassword, Validate.security(loginField.password.label))
  //     .min(8, Validate.during(8, 21))
  //     .max(21, Validate.during(8, 21)),
  // };
  // const handleLogin = async (values: LoginInput) => {
  //   setLoadingSubmitLogin(true);
  //   await Helper.delay(1500);
  //   const user = authSlice.users.find((item) => item.username === values.username);
  //   if (!user?.username) {
  //     setErrorMessage(Validate.userOrPasswordError);
  //   } else {
  //     const password = Hash.decryptAES(user.password);
  //     if (password === values.password) {
  //       dispatch(setCurrentUser(user));
  //     } else {
  //       setErrorMessage(Validate.userOrPasswordError);
  //     }
  //   }
  //   setLoadingSubmitLogin(false);
  // };
  // return { signMessageAndLogin, loadingLogin };
};

export const useRedirectAuth = () => {
  const currentUser = useAppSelector(getAuthSlice).currentUser;
  const isClient = typeof window !== 'undefined';
  if (currentUser?.username && isClient) {
    window.open('/', '_self');
  }
};
