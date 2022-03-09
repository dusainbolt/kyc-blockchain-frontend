import { PayloadName } from '@redux/reducer';
import { Role } from '@type/user';
// import { User } from '@type/user';

export type LoginParams = {
  address: string;
  signature: string;
  messageHash: string;
  role: Role;
};

export type LoginAction = Record<PayloadName, LoginParams>;

// export type UpdateUsersAction = Record<PayloadName, User[]>;
