import { Button } from '@common/Button';
import { StatusKYC } from '@common/Chip/StatusKyc';
import { DialogModal } from '@common/Dialog/DialogModal';
import { DialogActions, DialogProps, Grid } from '@mui/material';
import { confirmKycStart } from '@redux/slices/adminKycSlice';
import { openDialogApp } from '@redux/slices/layoutSlice';
import { useAppDispatch } from '@redux/store';
import Date from '@services/date';
import { Profile } from '@type/profile';
import { ProfileStatus } from '@type/user';
import { FC, useMemo } from 'react';
import { kycModalStyle } from './kycModalStyle';

interface KycModalProps extends DialogProps {
  onCloseModal?: any;
  kyc?: Profile;
  loadingAction?: boolean;
  index?: number;
}

export const KycModal: FC<KycModalProps> = ({ onCloseModal, index, loadingAction, kyc, ...otherProps }) => {
  const styles = kycModalStyle();
  const dispatch = useAppDispatch();

  const receiveConfirmApprove = (message: string) => {
    dispatch(confirmKycStart({ kycId: kyc?._id as string, status: ProfileStatus.APPROVE, message, index }));
  };

  const receiveReject = (message: string) => {
    dispatch(confirmKycStart({ kycId: kyc?._id as string, status: ProfileStatus.REJECT, message, index }));
  };

  const requestApproveKyc = () => {
    dispatch(
      openDialogApp({
        title: 'Approve the KYC',
        description: `Are you sure to send request? Then you can't edit your profile, you must waiting admin confirm your KYC.`,
        label: 'Reason',
        callbackOk: receiveConfirmApprove,
      })
    );
  };

  const requestRejectKyc = () => {
    dispatch(
      openDialogApp({
        title: 'Reject the KYC',
        description: `Are you sure to send request? Then you can't edit your profile, you must waiting admin confirm your KYC.`,
        label: 'Reason',
        require: true,
        callbackOk: receiveReject,
      })
    );
  };

  const renderButtonControl = useMemo(() => {
    switch (kyc?.status) {
      case ProfileStatus.REQUEST:
        return (
          <>
            <Button loading={loadingAction} variant="contained" color="error" onClick={requestRejectKyc}>
              Reject
            </Button>
            <Button loading={loadingAction} variant="contained" onClick={requestApproveKyc}>
              Approve
            </Button>
          </>
        );
      default:
        return '';
    }
  }, [kyc?.status, loadingAction]);

  return (
    <DialogModal
      id="kyc-modal"
      title={`Kyc Detail #${kyc?._id}`}
      {...otherProps}
      onCloseModal={onCloseModal}
      // loadContent={!kyc?._id}
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={styles.profileLabel}>Address</div>
              <div>{kyc?.userId?.address}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Email</div>
              <div>{kyc?.email}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Full name</div>
              <div>{kyc?.fullName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>First name</div>
              <div>{kyc?.firstName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Last name</div>
              <div>{kyc?.lastName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Birthday</div>
              <div>{Date.toDateStr(kyc?.birthday)}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Phone number</div>
              <div>{kyc?.phoneNumber}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Address</div>
              <div>{kyc?.address}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Current Address</div>
              <div>{kyc?.nowAddress}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Status</div>
              <div>
                <StatusKYC styleProps={{ marginTop: 4 }} status={kyc?.status as ProfileStatus} />
              </div>
            </Grid>
          </Grid>
        </>
      }
      action={<DialogActions>{renderButtonControl}</DialogActions>}
    />
  );
};
