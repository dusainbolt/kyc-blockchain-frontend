import { useDashboard } from '@hooks/useDashboard';
import { makeStyles } from '@mui/styles';
import { getAuthenSlice } from '@redux/slices/authentication';
import { useAppSelector } from '@redux/store';
import { defaultStyle } from '@styles/theme';
import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  container: defaultStyle.container,
});

const Home: FC<any> = ({ message }: any) => {
  const classes = useStyles();
  const { currentUser, users } = useAppSelector(getAuthenSlice);
  const { sayRole } = useDashboard(currentUser);
  return (
    <div className={classes.container}>
      {!!sayRole() && <div>{`Bạn là  ${sayRole()}`}</div>}
      {`${message} ${currentUser?.username}`}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h1" component="div" gutterBottom>
            h1. Heading
          </Typography>
        </Grid>
        <Grid item xs={3}>
          2
        </Grid>
        <Grid item xs={3}>
          3
        </Grid>
        <Grid item xs={3}>
          4
        </Grid>
      </Grid>
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Chào Mừng',
    },
  };
};

export default Home;
