import { Alert, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './HomePageStyle';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { MetaMaskIcon } from '@asset/icon/metamask';

const HomePageComponent: FC<any> = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Container maxWidth="lg">
        <Typography variant="h1" className={classes.title} component="h1" gutterBottom>
          Welcome to KYC Platform
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Share your KYC information everywhere with blockchain technology{' '}
        </Typography>
        <Alert className={classes.spacingContent} severity="info">
          Please choose method for connect to the platform
        </Alert>
        <Stack className={classes.spacingContent} direction="row" spacing={2}>
          <LoadingButton className={classes.btnMetamask} variant="outlined" startIcon={<MetaMaskIcon />}>
            Send
          </LoadingButton>{' '}
          <LoadingButton variant="outlined" startIcon={<SendIcon />}>
            Send
          </LoadingButton>
        </Stack>
      </Container>
    </main>
  );
};

export default HomePageComponent;
