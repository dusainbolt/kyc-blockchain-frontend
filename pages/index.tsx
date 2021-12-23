import { makeStyles } from '@mui/styles';
import { getAuthenSlice } from '@redux/slices/authentication';
import { useAppSelector } from '@redux/store';
import { defaultStyle } from '@styles/theme';
import { FC } from 'react';
// import styles from '../styles/Home.module.css';

const useStyles = makeStyles({
  container: defaultStyle.container,
});

const Home: FC<any> = ({ message }: any) => {
  const classes = useStyles();
  const currentUser = useAppSelector(getAuthenSlice).currentUser;
  return <div className={classes.container}>{`${message} ${currentUser?.username}`}</div>;
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Chào Mừng',
    },
  };
};

export default Home;
