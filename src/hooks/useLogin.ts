import { LoginInput } from '@type/loginType';

interface UseLogin {
  handleLogin: (values: LoginInput) => void;
}

export const useLogin = (): UseLogin => {
  const handleLogin = (values: LoginInput) => {
    console.log(values);
  };

  return { handleLogin };
};
