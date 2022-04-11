import { Layout } from '@common/Layout';
import { KycSharedHistory } from '@components/user/KycSharedHistory';
import { BreadcrumbsType } from '@type/layout';
import Head from 'next/head';

const UserHistory = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'KYC Shared History',
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>KYC Shared History</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <KycSharedHistory />
    </Layout>
  );
};

export default UserHistory;
