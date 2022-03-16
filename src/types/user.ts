// import { RegisterInput } from '@type/authtication';

import { StatusField } from './context';

export enum Role {
  USER,
  ADMIN,
  PROJECT_ADMIN,
}

export enum Gender {
  MALE,
  FEMALE,
}

export enum ProfileStatus {
  EDIT,
  REQUEST,
  APPROVE,
  REJECT,
  DEPLOY,
}

export const ProfileStatusData: Record<ProfileStatus, StatusField> = {
  [ProfileStatus.EDIT]: {
    color: 'blue',
    text: 'Editable',
  },
  [ProfileStatus.REQUEST]: {
    color: 'yellow',
    text: 'Requesting',
  },
  [ProfileStatus.APPROVE]: {
    color: 'green',
    text: '1231',
  },
  [ProfileStatus.REJECT]: {
    color: 'red',
    text: '1231',
  },
  [ProfileStatus.DEPLOY]: {
    color: 'violet',
    text: '1231',
  },
};
