import { StatusKYC } from '@common/Chip/StatusKyc';
import { profileStyle } from '@components/user/profileStyle';
import { Alert, Divider, Grid, Stack, Typography } from '@mui/material';
import { getProfileSlice, requestKycStart } from '@redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Date from '@services/date';
import { ProfileStatus } from '@type/user';
import { useMemo } from 'react';
import { Button } from '@common/Button';
import { openDialogApp } from '@redux/slices/layoutSlice';

export const Profile = () => {
  const { profile, loadingUpdate } = useAppSelector(getProfileSlice);
  const dispatch = useAppDispatch();

  const styles = profileStyle();

  const requestKyc = () => {
    dispatch(
      openDialogApp({
        title: 'Request your KYC',
        description: `Are you sure to send request? Then you can't edit your profile, you must waiting admin confirm your KYC.`,
        callbackOk: () => dispatch(requestKycStart()),
      })
    );
  };

  const renderButtonControl = useMemo(() => {
    switch (profile?.status) {
      case ProfileStatus.EDIT:
        return (
          <>
            <Button loading={loadingUpdate} variant="contained" href="/user/edit">
              Edit Profile
            </Button>
            <Button loading={loadingUpdate} onClick={requestKyc} variant="contained">
              Request KYC
            </Button>
          </>
        );
      default:
        return '';
    }
  }, [profile?.status, loadingUpdate]);

  const renderAlertNotice = useMemo(() => {
    switch (profile?.status) {
      case ProfileStatus.EDIT:
        return (
          <Alert className={styles.spacingContentSmall} severity="info">
            Your status is editable that you can edit your profile. If you determined every thing is correct you need
            request KYC to continue our process.
          </Alert>
        );
      default:
        return '';
    }
  }, [profile?.status]);

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Your Profile
      </Typography>
      <Divider style={{ marginBottom: 30 }} />
      {!profile?._id ? (
        <div>
          <Alert severity="warning">You don't have profile! Please create your profile by click button bellow</Alert>
          <Button className={styles.spacingContentSmall} variant="contained" href="/user/edit">
            Create My Profile
          </Button>
        </div>
      ) : (
        <div className={`${styles.spacingContentSmall} ${styles.profileWrap}`}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Email</div>
              <div>{profile.email}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Full name</div>
              <div>{profile.fullName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>First name</div>
              <div>{profile.firstName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Last name</div>
              <div>{profile.lastName}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Birthday</div>
              <div>{Date.toDateStr(profile.birthday)}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Phone number</div>
              <div>{profile.phoneNumber}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Address</div>
              <div>{profile.address}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Current Address</div>
              <div>{profile.nowAddress}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.profileLabel}>Status</div>
              <div>
                <StatusKYC styleProps={{ marginTop: 4 }} status={profile.status as ProfileStatus} />
              </div>
            </Grid>
          </Grid>
          {renderAlertNotice}
          <Stack className={styles.spacingContentSmall} direction="row" spacing={2}>
            {renderButtonControl}
          </Stack>
        </div>
      )}
    </div>
  );
};
