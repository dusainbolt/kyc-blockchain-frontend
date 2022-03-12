import { Layout } from '@common/Layout';
import { FormProfile } from '@components/user/FormProfile';
import { useConnectProvider } from '@hooks/useConnectProvider';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import { getProfileSlice } from '@redux/slices/profileSlice';
import { useAppSelector } from '@redux/store';
import { BreadcrumbsType } from '@type/layout';
import { ProfileData } from '@type/profile';
import { Formik } from 'formik';
import { useMemo } from 'react';

const UserHome = () => {
  const { profile } = useAppSelector(getProfileSlice);
  useConnectProvider();
  useRedirectAuth();

  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  const onSubmitForm = async (values: ProfileData) => {
    console.log('values: ', values);
  };

  const getInitValues = useMemo(() => {
    return {
      address: profile?.address,
      birthday: profile?.birthday,
      email: profile?.email,
      firstName: profile?.firstName,
      fullName: profile?.fullName,
      gender: profile?.gender,
      lastName: profile?.lastName,
      nowAddress: profile?.nowAddress,
      phoneNumber: profile?.phoneNumber,
    };
  }, [profile]);

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Formik onSubmit={onSubmitForm} initialValues={getInitValues}>
        <FormProfile getInitValues={getInitValues} />
      </Formik>
    </Layout>
  );
};

export default UserHome;
