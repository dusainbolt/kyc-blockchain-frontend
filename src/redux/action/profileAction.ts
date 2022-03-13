import { PayloadName } from '@redux/reducer';
import { Profile } from '@type/profile';

export type updateProfileAction = Record<PayloadName, Profile>;
