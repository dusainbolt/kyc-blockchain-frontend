import { Layout } from '@common/Layout';
import { Profile } from '@components/user/Profile';
import { useGetProfile } from '@hooks/useGetProfile';
import { BreadcrumbsType } from '@type/layout';
import Head from 'next/head';

const UserHome = () => {
  useGetProfile();

  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>KYC Profile</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Profile />
    </Layout>
  );
};

export default UserHome;
