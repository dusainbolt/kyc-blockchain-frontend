import { Layout } from '@common/Layout';
import { KycHistory } from '@components/user/KycHistory';
import { BreadcrumbsType } from '@type/layout';
import Head from 'next/head';

const UserHistory = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'KYC History',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>KYC History</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <KycHistory />
    </Layout>
  );
};

export default UserHistory;
