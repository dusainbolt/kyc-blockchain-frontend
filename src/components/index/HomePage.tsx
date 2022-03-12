import { Alert, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useStyles } from './homePageStyle';
// import Button from '@mui/lab/Button';
import Stack from '@mui/material/Stack';
import { MetaMaskIcon } from '@asset/icon/metamask';
import { useControlConnect } from '@hooks/useConnectProvider';
import { TypeWallet } from '@type/wallet';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getWalletSlice } from '@redux/slices/walletSlice';
import useWalletSignature from '@hooks/useWalletSignature';
import { getAuthSlice, loginStart } from '@redux/slices/authSlice';
import { LoginParams } from '@redux/action/authAction';
import { Role } from '@type/user';
import { Button } from '@common/Button';
import { ButtonIcon } from '@common/Button/ButtonIcon';
import LogoutIcon from '@mui/icons-material/Logout';

const HomePageComponent: FC<any> = () => {
  const classes = useStyles();
  const { connectWallet, onDisconnect } = useControlConnect();
  const wallet = useAppSelector(getWalletSlice);
  const auth = useAppSelector(getAuthSlice);

  const { signMessage, loadingSignature, walletSignature } = useWalletSignature();
  const [role, setRole] = useState<Role>(Role.USER);

  const dispatch = useAppDispatch();

  const handleChange = (event) => {
    setRole(parseInt(event.target.value, 10) || Role.USER);
  };

  useEffect(() => {
    if (walletSignature.signature) {
      handleLogin();
    }
  }, [walletSignature]);

  const handleLogin = () => {
    dispatch(loginStart({ ...walletSignature, role, address: wallet.address } as LoginParams));
  };

  const clickLogin = () => {
    signMessage(wallet.address);
  };

  const loadingBtn = auth.loadingLogin || loadingSignature;

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
              <Button
                onClick={() => connectWallet(TypeWallet.METAMASK)}
                className={classes.btnMetamask}
                variant="outlined"
                startIcon={<MetaMaskIcon />}
              >
                Metamask
              </Button>{' '}
              {/* <Button
                onClick={() => connectWallet(TypeWallet.WALLET_CONNECT)}
                className={classes.btnWalletConnect}
                variant="outlined"
                startIcon={<WalletConnectIcon />}
              >
                WalletConnect
              </Button> */}
            </Stack>
          </>
        ) : (
          <>
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              Your wallet address:
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button className={classes.btnMetamask} startIcon={<MetaMaskIcon />}>
                {wallet.address}
              </Button>
              <ButtonIcon loading={loadingBtn} onClick={onDisconnect} icon={<LogoutIcon />} />
            </Stack>
            <Alert className={classes.spacingContent} severity="success">
              Thanks for your cooperation with us. You can choose permission and login right now.
            </Alert>
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              1. What would you like to role for login?
            </Typography>
            <ToggleButtonGroup
              className={classes.btnGroupToggle}
              color="primary"
              value={role}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value={Role.USER}>KYC User</ToggleButton>
              <ToggleButton value={Role.PROJECT_ADMIN}>Business Manager</ToggleButton>
              <ToggleButton value={Role.ADMIN}>Administrator</ToggleButton>
            </ToggleButtonGroup>
            <Typography className={classes.spacingContent} variant="subtitle1" gutterBottom component="div">
              2. Please click to continue?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button loading={loadingBtn} onClick={clickLogin} variant="contained">
                Login
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </main>
  );
};

export default HomePageComponent;
