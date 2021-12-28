import { addUser, getAuthenSlice } from '@redux/slices/authentication';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Hash from '@services/hash';
import Helper from '@services/helper';
import Validate from '@services/validate';
import { RegisterInput, RegisterValidate, registerField } from '@type/authentication';
import { User } from '@type/user';
import { useState } from 'react';
import * as yup from 'yup';
//@ts-ignore
import { NotificationManager } from 'react-notifications';
import { Role } from '@type/authorisation';

interface UseRegister {
  initialFormRegister: RegisterInput;
  validateForm: any;
  loadingSubmitRegister: boolean;
  isWaitOTP: boolean;
  handleRegister: (values: RegisterInput) => void;
  handleSubmitOTP: () => void;
}

export const useRegister = (): UseRegister => {
  const dispatch = useAppDispatch();
  const authenSlice = useAppSelector(getAuthenSlice);
  const [isWaitOTP, setIsWaitOTP] = useState<boolean>(false);
  const [loadingSubmitRegister, setLoadingSubmitRegister] = useState<boolean>(false);
  const initialFormRegister: RegisterInput = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
    phoneNumber: '',
    address: '',
  };

  const validateForm: RegisterValidate = {
    email: yup.string().email(Validate.email()).required(Validate.require(registerField.email.label)),
    username: yup
      .string()
      .required(Validate.require(registerField.username.label))
      .test(Validate.unique.name, Validate.unique.message(registerField.username.label), (value: any) => {
        return !authenSlice.users.some((user) => user.username === value);
      })
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21)),
    password: yup
      .string()
      .required(Validate.require(registerField.password.label))
      .matches(Validate.regexPassword, Validate.security(registerField.password.label))
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21)),
    rePassword: yup
      .string()
      .required(Validate.require(registerField.rePassword.label))
      .oneOf([yup.ref('password'), null], Validate.notMatch(registerField.password.label)),
    phoneNumber: yup.string().matches(Validate.regexPhone, Validate.phone()),
    address: yup.string(),
  };

  const handleRegister = async (values: RegisterInput) => {
    setLoadingSubmitRegister(true);
    await Helper.delay(1500);
    const password = Hash.encryptAES(values.password);
    const user: User = {
      status: true,
      password,
      address: values.address,
      email: values.email,
      username: values.username,
      phoneNumber: values.phoneNumber,
      role: values.username === 'dusainbolt' ? Role.ADMIN : Role.User,
    };

    dispatch(addUser(user));
    NotificationManager.success('Bạn vừa đăng ký thành công', 'Thành công');
    setIsWaitOTP(true);
    setLoadingSubmitRegister(false);
  };

  const handleSubmitOTP = async () => {
    setLoadingSubmitRegister(true);
    await Helper.delay(1500);
    window.open('/login', '_self');
  };

  return { handleRegister, initialFormRegister, validateForm, loadingSubmitRegister, isWaitOTP, handleSubmitOTP };
};
