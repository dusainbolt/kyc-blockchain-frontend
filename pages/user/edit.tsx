import { Layout } from '@common/Layout';
import { FormProfile } from '@components/user/FormProfile';
import { openDialogApp } from '@redux/slices/layoutSlice';
import { getProfileSlice, updateProfileStart } from '@redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { BreadcrumbsType } from '@type/layout';
import { Profile } from '@type/profile';
import { Formik } from 'formik';
import Head from 'next/head';
import { useMemo } from 'react';

const UserHome = () => {
  const { profile } = useAppSelector(getProfileSlice);
  const dispatch = useAppDispatch();
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  const onSubmitForm = (values: Profile) => {
    const data = { ...values };
    if (data?.email === profile?.email) {
      delete data.email;
    }
    if (data?.phoneNumber === profile?.phoneNumber) {
      delete data.phoneNumber;
    }
    dispatch(
      openDialogApp({
        title: 'Update your Profile',
        description: 'Are you sure to update with content that you type?',
        callbackOk: () => dispatch(updateProfileStart(data)),
      })
    );
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
      identifierImage1: profile?.identifierImage1,
      identifierImage2: profile?.identifierImage2,
      _id: profile?._id,
    };
  }, [profile]);

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>KYC Edit</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Formik onSubmit={onSubmitForm} initialValues={getInitValues as any}>
        <FormProfile />
      </Formik>
    </Layout>
  );
};

export default UserHome;
