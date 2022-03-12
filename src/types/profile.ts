import FieldText from '@common/FieldInput';
import { string } from 'yup';
import { IField, Restrict } from './field';
import { Gender } from './user';

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

export type ProfileData = Record<ProfileInputName, any>;

export type Profile = {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  birthday: any;
  phoneNumber: string;
  address: string;
  nowAddress: string;
};

export type ProfileSlice = {
  profile?: ProfileData;
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
    component: FieldText,
    required: true,
    grid: 4,
  },
  birthday: {
    name: 'birthday',
    label: 'Birthday',
    component: FieldText,
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
