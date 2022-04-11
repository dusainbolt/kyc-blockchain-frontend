import { MetaMaskIcon } from '@asset/icon/metamask';
import { Button } from '@common/Button';
import { ButtonIcon } from '@common/Button/ButtonIcon';
import ShareIcon from '@mui/icons-material/Share';
import { Alert, Container, Stack, Typography } from '@mui/material';
import { ContractService } from '@services/contract';
import { Project } from '@type/project';
import { useWeb3React } from '@web3-react/core';
import { FC, useCallback, useEffect, useState } from 'react';
import { projectDetailStyle } from './projectDetailStyle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useControlConnect } from '@hooks/useConnectProvider';
import { getWalletSlice } from '@redux/slices/walletSlice';
import { TypeWallet } from '@type/wallet';
import { checkKycSharedStart } from '@redux/slices/kycSharedSlice';

const ProjectDetail: FC<{ project: Project }> = ({ project }) => {
  const styles = projectDetailStyle();
  const { account, library } = useWeb3React();
  const [loadingDeploy, setLoadingDeploy] = useState<boolean>(false);

  const { connectWallet, onDisconnect } = useControlConnect();
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(getWalletSlice);

  const callbackDeploy = (e) => {
    console.log(e);
  };

  const onClickShareKYC = useCallback(async () => {
    setLoadingDeploy(true);
    try {
      const contractService = new ContractService(library, account as any);
      await contractService.callContractKYC(project.encodeShareKycABI as string, callbackDeploy);
      setLoadingDeploy(false);
    } catch (e) {
      setLoadingDeploy(false);
    }
  }, [account, library, project]);

  useEffect(() => {
    if (wallet.address && project._id) {
      setTimeout(() => {
        dispatch(checkKycSharedStart({ userAddress: wallet.address as any }));
      }, 1000);
    }
  }, [wallet.address, project._id]);

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <Typography variant="h1" className={styles.title} component="h1" gutterBottom>
          Welcome to {project?.name}
        </Typography>
        <img src={project?.avatar} alt={project?.name} />
        {!wallet.connected ? (
          <>
            <Alert className={styles.spacingContent} severity="info">
              Please choose method and connect your wallet to the platform
            </Alert>
            <Stack className={styles.spacingContent} direction="row" spacing={2}>
              <Button
                onClick={() => connectWallet(TypeWallet.METAMASK)}
                className={styles.btnMetamask}
                variant="outlined"
                startIcon={<MetaMaskIcon />}
              >
                Metamask
              </Button>{' '}
            </Stack>
          </>
        ) : (
          <>
            <Typography className={styles.spacingContent} variant="subtitle1" gutterBottom component="div">
              Your wallet address:
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button className={styles.btnMetamask} startIcon={<MetaMaskIcon />}>
                {wallet.address}
              </Button>
              <ButtonIcon onClick={onDisconnect} icon={<LogoutIcon />} />
            </Stack>
          </>
        )}
        {account && (
          <>
            <Alert className={styles.spacingContent} severity="success">
              Please click "Share KYC" button below to share KYC info with {project?.name}
            </Alert>
            <Button
              startIcon={<ShareIcon />}
              className={styles.spacingContent}
              loading={loadingDeploy}
              onClick={onClickShareKYC}
              variant="contained"
            >
              Share KYC
            </Button>
          </>
        )}
      </Container>
    </main>
  );
};

export default ProjectDetail;
