import { Layout } from '@common/Layout';
import { KycHistory } from '@components/user/KycHistory';
import { BreadcrumbsType } from '@type/layout';

const UserHistory = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'KYC History',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <KycHistory />
    </Layout>
  );
};

export default UserHistory;
