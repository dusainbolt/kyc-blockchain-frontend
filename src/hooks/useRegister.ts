import { addUser, getAuthenSlice } from '@redux/slices/authentication';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Hash from '@services/hash';
import Validate from '@services/validate';
import { RegisterInput, RegisterValidate, registerField } from '@type/authentication';
import { User } from '@type/user';
import * as yup from 'yup';

interface UseRegister {
  handleRegister: (values: RegisterInput) => void;
  initialValuesForm: RegisterInput;
  validateForm: any;
}

export const useRegister = (): UseRegister => {
  const dispatch = useAppDispatch();
  const authenSlice = useAppSelector(getAuthenSlice);
  const initialValuesForm: RegisterInput = {
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

  const handleRegister = (values: RegisterInput) => {
    const password = Hash.encryptAES(values.password);
    // const unHashPassword = Hash.decryptAES(password);
    const user: User = {
      status: true,
      password,
      address: values.address,
      email: values.email,
      username: values.username,
      phoneNumber: values.phoneNumber,
    };

    dispatch(addUser(user));
  };

  return { handleRegister, initialValuesForm, validateForm };
};
