import { Role } from '@type/authorisation';
import { User } from '@type/user';

interface UseDashboard {
  sayRole: () => void;
}

export const useDashboard = (user?: User): UseDashboard => {
  const sayRole = (): string => {
    switch (user?.role) {
      case Role.ADMIN:
        return 'Quản trị viên';
      case Role.MANAGER:
        return 'Quản lý';
      case Role.MEMBER:
        return 'Thành viên';
      default:
        return '';
    }
  };
  return { sayRole };
};
