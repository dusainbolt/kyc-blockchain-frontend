import { Layout } from '@common/Layout';
import { KycList } from '@components/admin/KycList';
import { BreadcrumbsType } from '@type/layout';
import Head from 'next/head';

const AdminKycList = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'KYC Management',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>KYC Management</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <KycList />
    </Layout>
  );
};

export default AdminKycList;
