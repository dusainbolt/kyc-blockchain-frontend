import { Layout } from '@common/Layout';
import { profileStyle } from '@components/user/profileStyle';
import { Alert, Button } from '@mui/material';
import { BreadcrumbsType } from '@type/layout';

const UserHome = () => {
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Profile',
    },
  ];

  const classes = profileStyle();

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Alert severity="warning">You don't have profile! Please create your profile by click button bellow</Alert>
      <Button className={classes.spacingContentSmall} variant="contained" href="/user/edit">
        Create My Profile
      </Button>
    </Layout>
  );
};

export default UserHome;
