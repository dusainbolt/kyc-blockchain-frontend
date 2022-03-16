import FieldDate from '@common/Form/FieldDate';
import FieldText from '@common/Form/FieldInput';
import FieldSelect from '@common/Form/FieldSelect';
import { IField, Restrict } from './field';
import { Gender, ProfileStatus } from './user';

export type ProfileInputName =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'fullName'
  | 'gender'
  | 'birthday'
  | 'phoneNumber'
  | 'address'
  | 'nowAddress';

export type Profile = {
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: Gender;
  birthday?: any;
  phoneNumber?: string;
  address?: string;
  nowAddress?: string;
  _id?: string;
  status?: ProfileStatus;
};

export type ProfileSlice = {
  profile?: Profile;
  loadingUpdate: boolean;
  loadingProfile: boolean;
};

export const profileField: Record<ProfileInputName, IField> = {
  email: {
    name: 'email',
    label: 'Email',
    component: FieldText,
    required: true,
    restric: Restrict.DISALLOW_SPECIAL_CHAR,
    grid: 6,
  },
  fullName: {
    name: 'fullName',
    label: 'Full name',
    component: FieldText,
    required: true,
    grid: 6,
  },
  firstName: {
    name: 'firstName',
    label: 'First name',
    component: FieldText,
    required: true,
    grid: 4,
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    component: FieldText,
    required: true,
    grid: 4,
  },
  gender: {
    name: 'gender',
    label: 'Gender',
    component: FieldSelect,
    required: true,
    grid: 4,
    options: [
      { label: 'Male', value: Gender.MALE },
      { label: 'Female', value: Gender.FEMALE },
    ],
  },
  birthday: {
    name: 'birthday',
    label: 'Birthday',
    component: FieldDate,
    required: true,
  },
  phoneNumber: {
    name: 'phoneNumber',
    label: 'Phone number',
    component: FieldText,
    required: true,
  },
  address: {
    name: 'address',
    label: 'Address',
    component: FieldText,
    required: true,
    grid: 12,
  },
  nowAddress: {
    name: 'nowAddress',
    label: 'Current address',
    component: FieldText,
    required: true,
    grid: 12,
  },
};
