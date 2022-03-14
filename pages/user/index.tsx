import { Layout } from '@common/Layout';
import { Profile } from '@components/user/Profile';
import { profileStyle } from '@components/user/profileStyle';
import { getProfileSlice } from '@redux/slices/profileSlice';
import { useAppSelector } from '@redux/store';
import { BreadcrumbsType } from '@type/layout';

const UserHome = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Profile />
    </Layout>
  );
};

export default UserHome;
