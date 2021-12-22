import { FC } from 'react';
import styles from '../styles/Home.module.css';

const Home: FC<any> = ({ message }: any) => {
  // const classes = useStyles();
  // console.log(isWidthDown('xs', width));
  return <div className={styles.container}>{message}</div>;
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Home',
    },
  };
};

export default Home;
