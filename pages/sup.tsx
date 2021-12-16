import { FC } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import styles from '../styles/Home.module.css';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'red',
    fontSize: 22,
  },
}));

const Sup: FC<any> = ({ message, width }: any) => {
  const classes = useStyles();
  console.log(isWidthDown('xs', width));
  return (
    <div className={styles.container}>
      <button type="button">I am so fucking boring!</button>
      <Button className={classes.root} variant="contained">
        {message}
      </Button>
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'sup',
    },
  };
};

export default withWidth({ noSSR: true })(Sup);
