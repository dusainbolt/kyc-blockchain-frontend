import { Alert, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FC, useState } from 'react';
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
  const { connectWallet, onDisconnect } = useControlConnect();
  const wallet = useAppSelector(getWalletSlice);

  const [alignment, setAlignment] = useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              Your wallet address:
            </Typography>
            <Stack direction="row" spacing={2}>
              {wallet.type === TypeWallet.METAMASK && (
                <LoadingButton className={classes.btnMetamask} startIcon={<MetaMaskIcon />}>
                  {wallet.address}
                </LoadingButton>
              )}

              {wallet.type === TypeWallet.WALLET_CONNECT && (
                <LoadingButton className={classes.btnWalletConnect} startIcon={<WalletConnectIcon />}>
                  {wallet.address}
                </LoadingButton>
              )}
            </Stack>
            <Alert className={classes.spacingContent} severity="success">
              Thanks for your cooperation with us. You can choose permission and login right now.
            </Alert>
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              1. What would you like to role for login?
            </Typography>
            <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
              <ToggleButton value="web">KYC User</ToggleButton>
              <ToggleButton value="android">Business Manager</ToggleButton>
              <ToggleButton value="ios">Administrator</ToggleButton>
            </ToggleButtonGroup>
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              2. Please click to continue?
            </Typography>
            <Stack direction="row" spacing={2}>
              <LoadingButton variant="contained">Login</LoadingButton>
              <LoadingButton onClick={onDisconnect} color="error" variant="contained">
                Disconnect
              </LoadingButton>
            </Stack>
          </>
        )}
      </Container>
    </main>
  );
};

export default HomePageComponent;
