import { getProfileStart } from '@redux/slices/profileSlice';
import { useAppDispatch } from '@redux/store';
import { useEffect } from 'react';

export const useGetProfile = () => {
  const dispatch = useAppDispatch();
  // const { profile } = useAppSelector(getProfileSlice);

  useEffect(() => {
    dispatch(getProfileStart());
  }, []);
};
