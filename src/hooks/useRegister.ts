import Validate from '@services/validate';
import { RegisterInput, RegisterValidate, registerField } from '@type/registerType';
import * as yup from 'yup';

interface UseRegister {
  handleRegister: (values: RegisterInput) => void;
  initialValuesForm: RegisterInput;
  validateForm: any;
}

export const useRegister = (): UseRegister => {
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
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21))
      .required(Validate.require(registerField.username.label)),
    password: yup
      .string()
      .min(8, Validate.during(8, 21))
      .max(21, Validate.during(8, 21))
      .required(Validate.require(registerField.password.label)),
    rePassword: yup.string().required(Validate.require(registerField.rePassword.label)),
    phoneNumber: yup.string(),
    address: yup.string(),
  };

  const handleRegister = (values: RegisterInput) => {
    console.log(values);
  };

  return { handleRegister, initialValuesForm, validateForm };
};
