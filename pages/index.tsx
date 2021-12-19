import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import styles from '../styles/Home.module.css';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'red',
    fontSize: 22,
  },
}));

const Home: FC<any> = ({ message, width }: any) => {
  const classes = useStyles();
  console.log(isWidthDown('xs', width));
  return <div className={styles.container}>{message}</div>;
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Home',
    },
  };
};

export default withWidth({ noSSR: true })(Home);
