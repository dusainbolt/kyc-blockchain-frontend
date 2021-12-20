import FieldText from '@common/FieldInput';
import Constant from '@services/constant';
import { IField } from './field';

type RegisterInputName = 'username' | 'password' | 'rePassword' | 'email' | 'phoneNumber' | 'address';

export type RegisterInput = Record<RegisterInputName, string>;

export type RegisterValidate = Record<RegisterInputName, any>;

export const registerField: Record<RegisterInputName, IField> = {
  email: {
    name: 'email',
    label: 'Địa chỉ email',
    component: FieldText,
    required: true,
  },
  username: {
    name: 'username',
    label: 'Tên đăng nhập',
    component: FieldText,
    required: true,
  },
  password: {
    name: 'password',
    label: 'Mật khẩu',
    component: FieldText,
    type: Constant.FORM.TYPE_PASSWORD,
    required: true,
  },
  rePassword: {
    name: 'rePassword',
    label: 'Nhập lại mật khẩu',
    component: FieldText,
    type: Constant.FORM.TYPE_PASSWORD,
    required: true,
  },
  phoneNumber: {
    name: 'phoneNumber',
    label: 'Số điện thoại',
    component: FieldText,
  },
  address: {
    name: 'address',
    label: 'Địa chỉ',
    component: FieldText,
  },
};
