import { PayloadName } from '@redux/reducer';
import { Profile } from '@type/profile';

export type UpdateProfileAction = Record<PayloadName, Profile>;
