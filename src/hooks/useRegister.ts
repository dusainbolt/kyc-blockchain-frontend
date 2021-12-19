import { RegisterInput } from '@type/registerType';

interface UseRegister {
  handleRegister: (values: RegisterInput) => void;
  initialValuesForm: RegisterInput;
}

export const useRegister = (): UseRegister => {
  const initialValuesForm: RegisterInput = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    rePassword: '',
  };
  const handleRegister = (values: RegisterInput) => {
    console.log(values);
  };

  return { handleRegister, initialValuesForm };
};
