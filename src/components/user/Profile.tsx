import { ChipStatus } from '@common/Chip/ChipStatus';
import { profileStyle } from '@components/user/profileStyle';
import { Alert, Button, Divider, Grid, Typography } from '@mui/material';
import { getProfileSlice } from '@redux/slices/profileSlice';
import { useAppSelector } from '@redux/store';
import Date from '@services/date';
import { ProfileStatus, ProfileStatusData } from '@type/user';

export const Profile = () => {
  const { profile } = useAppSelector(getProfileSlice);

  const styles = profileStyle();
  const statusData = ProfileStatusData[profile?.status as ProfileStatus];

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
                <ChipStatus styleProps={{ marginTop: 4 }} label={statusData.text} colorStyle={statusData.color} />
              </div>
            </Grid>
          </Grid>
          <Alert className={styles.spacingContentSmall} severity="info">
            Please choose method and connect your wallet to the platform
          </Alert>
        </div>
      )}
    </div>
  );
};