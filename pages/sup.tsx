import { FC } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import styles from '../styles/Home.module.css';
import { getSeoHomeSlice, getSeoHomeStart } from '@src/redux/slices/seoHomeSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: 'red',
    fontSize: 22,
  },
}));

const Sup: FC<any> = ({ message, width }: any) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  console.log(isWidthDown('xs', width));
  const seoHome = useAppSelector(getSeoHomeSlice);
  console.log('========> SEOHOME REDUCER', seoHome);
  return (
    <div className={styles.container}>
      <button type="button">I am so fucking boring!</button>
      <Button onClick={() => dispatch(getSeoHomeStart(null))} className={classes.root} variant="contained">
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
