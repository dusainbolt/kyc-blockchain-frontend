import { Role } from '@type/authorisation';
import { User } from '@type/user';

interface UseDashboard {
  getRole: (role: Role) => string;
}

export const useDashboard = (): UseDashboard => {
  const getRole = (role?: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return 'Quản trị viên';
      case Role.MANAGER:
        return 'Quản lý';
      case Role.MEMBER:
        return 'Thành viên';
      default:
        return 'Người dùng';
    }
  };
  return { getRole };
};
