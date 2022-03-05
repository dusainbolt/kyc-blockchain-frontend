import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '@redux/store';
import { compose } from '@reduxjs/toolkit';
import theme, { createEmotionCache } from '@styles/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import NoSsr from '@mui/material/NoSsr';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
//@ts-ignore
import { NotificationContainer } from 'react-notifications';
import '@styles/globals.css';
import 'react-notifications/lib/notifications.css';
import { ethers } from 'ethers';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  library.pollingInterval = 10000;
  return library;
};

const MyApp: FC<MyAppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore();
  const isClient = typeof window !== 'undefined';

  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles?.parentElement?.removeChild(jssStyles);
  //   }
  // }, []);

  const PageComponent = isClient ? (
    <PersistGate persistor={(store as any).__persistor} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {PageComponent}
          <NoSsr>
            <NotificationContainer />
          </NoSsr>
        </ThemeProvider>
      </Web3ReactProvider>
    </CacheProvider>
  );
};

export default compose(wrapper.withRedux)(MyApp);
