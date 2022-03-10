import { getAuthSlice } from '@redux/slices/authSlice';
import { getWalletSlice } from '@redux/slices/walletSlice';
import { useAppSelector } from '@redux/store';
import { Role } from '@type/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirectAuth = () => {
  const { role, token } = useAppSelector(getAuthSlice);
  const { address, processing } = useAppSelector(getWalletSlice);
  const router = useRouter();

  useEffect(() => {
    if (token && address) {
      switch (role) {
        case Role.ADMIN:
          router.push('/user');
          break;
        default:
          router.push('/user');
          break;
      }
    } else if (!processing) {
      router.push('/');
    }
  }, [token, address, role, processing]);
};