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
    color: '#e3b300',
    text: 'Requesting',
  },
  [ProfileStatus.APPROVE]: {
    color: 'green',
    text: 'Approve',
  },
  [ProfileStatus.REJECT]: {
    color: 'red',
    text: 'Reject',
  },
  [ProfileStatus.DEPLOY]: {
    color: 'violet',
    text: 'Deploy',
  },
};
