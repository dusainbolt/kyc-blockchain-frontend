import { Layout } from '@common/Layout';
import { KycList } from '@components/admin/KycList';
import { BreadcrumbsType } from '@type/layout';

const AdminKycList = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'KYC List',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <KycList />
    </Layout>
  );
};

export default AdminKycList;
