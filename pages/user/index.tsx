import { Layout } from '@common/Layout';
import { useConnectProvider } from '@hooks/useConnectProvider';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import { BreadcrumbsType } from '@type/layout';

const UserHome = () => {
  useConnectProvider();
  useRedirectAuth();

  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Home',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div style={{ height: '200vh' }}>USER HOME PAGE</div>
    </Layout>
  );
};

export default UserHome;
