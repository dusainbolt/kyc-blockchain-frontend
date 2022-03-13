import { getProfileSlice, getProfileStart } from '@redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useEffect } from 'react';

export const useGetProfile = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(getProfileSlice);

  useEffect(() => {
    if (!profile?.address) {
      dispatch(getProfileStart());
    }
  }, []);
};
