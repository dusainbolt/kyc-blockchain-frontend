import { Layout } from '@common/Layout';
// import { editStyle } from '@components/user/editStyle';
import { useConnectProvider } from '@hooks/useConnectProvider';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import { BreadcrumbsType } from '@type/layout';

const UserHome = () => {
  useConnectProvider();
  useRedirectAuth();

  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  //   const classes = editStyle();

  return <Layout breadcrumbs={breadcrumbs}>12313</Layout>;
};

export default UserHome;
