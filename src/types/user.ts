import { Role } from './authorisation';
import { RegisterInput } from '@type/authentication';

export interface User extends Omit<RegisterInput, 'rePassword'> {
  status: boolean;
  role: Role;
}
