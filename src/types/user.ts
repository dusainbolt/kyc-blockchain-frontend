import { RegisterInput } from '@type/authentication';

export interface User extends Omit<RegisterInput, 'rePassword'> {
  status: boolean;
}
