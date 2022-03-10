import { FC, Fragment } from 'react';
import { useAppSelector, wrapper } from '@redux/store';
import { SSGContext } from '@type/context';
import Head from 'next/head';
import HomePageComponent from '@components/index/HomePage';
import { useConnectProvider } from '@hooks/useConnectProvider';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useWeb3React } from '@web3-react/core';

const Home: FC<any> = () => {
  useConnectProvider();
  useRedirectAuth();
  const { token } = useAppSelector(getAuthSlice);
  const { account } = useWeb3React();
  return (
    <Fragment>
      <Head>
        <title>KYC Platform Home</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {(!token || !account) && <HomePageComponent />}
    </Fragment>
  );
};

export const getStaticProps = wrapper.getStaticProps((): SSGContext | any => async () => {
  // await Helper.delay(5000);
});

export default Home;
