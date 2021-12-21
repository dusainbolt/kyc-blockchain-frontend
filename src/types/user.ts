import { RegisterInput } from '@type/authentication';

export interface User extends RegisterInput {
  status: boolean;
}
