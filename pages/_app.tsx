// pages/_app.tsx
/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '@redux/store';
import { compose } from '@reduxjs/toolkit';
import theme from '@styles/theme';

import '@styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const PageComponent = isClient ? (
    <PersistGate persistor={(store as any).__persistor} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {PageComponent}
      </ThemeProvider>
    </>
  );
};

export default compose(wrapper.withRedux)(MyApp);
