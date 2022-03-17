import { Layout } from '@common/Layout';
import { Profile } from '@components/user/Profile';
import { BreadcrumbsType } from '@type/layout';

const AdminMyAccount = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'My Account',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Profile />
    </Layout>
  );
};

export default AdminMyAccount;
