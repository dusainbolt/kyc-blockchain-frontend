import { Alert, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './HomePageStyle';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { MetaMaskIcon } from '@asset/icon/metamask';
import { WalletConnectIcon } from '@asset/icon/walletConnect';
import { useControlConnect } from '@hooks/useConnectProvider';
import { TypeWallet } from '@type/wallet';
import { useAppSelector } from '@redux/store';
import { getWalletSlice } from '@redux/slices/walletSlice';

const HomePageComponent: FC<any> = () => {
  const classes = useStyles();
  const { connectWallet, disconnectWallet } = useControlConnect();
  const wallet = useAppSelector(getWalletSlice);
  return (
    <main className={classes.main}>
      <Container maxWidth="lg">
        <Typography variant="h1" className={classes.title} component="h1" gutterBottom>
          Welcome to KYC Platform
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Share your KYC information everywhere with blockchain technology{' '}
        </Typography>
        {!wallet.connected ? (
          <>
            <Alert className={classes.spacingContent} severity="info">
              Please choose method and connect your wallet to the platform
            </Alert>
            <Stack className={classes.spacingContent} direction="row" spacing={2}>
              <LoadingButton
                onClick={() => connectWallet(TypeWallet.METAMASK)}
                className={classes.btnMetamask}
                variant="outlined"
                startIcon={<MetaMaskIcon />}
              >
                Metamask
              </LoadingButton>{' '}
              <LoadingButton
                onClick={() => connectWallet(TypeWallet.WALLET_CONNECT)}
                className={classes.btnWalletConnect}
                variant="outlined"
                startIcon={<WalletConnectIcon />}
              >
                WalletConnect
              </LoadingButton>
            </Stack>
          </>
        ) : (
          <>
            <Alert className={classes.spacingContent} severity="info">
              Thanks for your cooperation with us. You can choose permission and login right now.
            </Alert>
            <Stack className={classes.spacingContent} direction="row" spacing={2}>
              <LoadingButton
                onClick={() => connectWallet(TypeWallet.METAMASK)}
                className={classes.btnMetamask}
                variant="outlined"
                startIcon={<MetaMaskIcon />}
              >
                Metamask
              </LoadingButton>{' '}
              <LoadingButton
                onClick={disconnectWallet}
                className={classes.btnWalletConnect}
                variant="outlined"
                startIcon={<WalletConnectIcon />}
              >
                WalletConnect
              </LoadingButton>
            </Stack>
          </>
        )}
      </Container>
    </main>
  );
};

export default HomePageComponent;
