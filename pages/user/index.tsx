import { Layout } from '@common/Layout';
import { Profile } from '@components/user/Profile';
import { useGetProfile } from '@hooks/useGetProfile';
import { BreadcrumbsType } from '@type/layout';

const UserHome = () => {
  useGetProfile();

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
