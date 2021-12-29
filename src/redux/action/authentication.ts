import { PayloadName } from '@redux/reducer';
import { User } from '@type/user';

export type AddUserAction = Record<PayloadName, User>;

export type UpdateUsersAction = Record<PayloadName, User[]>;
