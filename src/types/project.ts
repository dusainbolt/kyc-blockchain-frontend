import FieldText from '@common/Form/FieldInput';
import { Paging, StatusField } from './context';
import { IField, Restrict } from './field';

export enum ProjectStatus {
  INACTIVE,
  ACTIVE,
}

export type ProjectInputName = 'name' | 'avatar';

export type Project = {
  _id?: string;
  apiKey?: string;
  name?: string;
  userId?: string;
  status?: ProjectStatus;
  encodeShareKycABI?: string;
  message?: string;
  encodeABI?: string;
  avatar?: string;
  updatedAt?: string;
};

export type ProjectSlice = {
  data: Project[];
  paging: Paging;
  loadingData: boolean;
  projectDetail?: Project;
};

export const ProjectStatusData: Record<ProjectStatus, StatusField> = {
  [ProjectStatus.INACTIVE]: {
    color: 'red',
    text: 'Inactive',
  },
  [ProjectStatus.ACTIVE]: {
    color: 'green',
    text: 'Active',
  },
};

export const projectField: Record<ProjectInputName, IField> = {
  name: {
    name: 'name',
    label: 'Your business name',
    component: FieldText,
    required: true,
    restric: Restrict.DISALLOW_SPECIAL_CHAR,
    grid: 12,
  },
  avatar: {
    name: 'avatar',
    label: 'Your business logo',
    component: FieldText,
    restric: Restrict.DISALLOW_SPECIAL_CHAR,
    grid: 12,
  },
};
