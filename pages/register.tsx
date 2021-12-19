import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { defaultStyle } from '@styles/theme';
import { Formik } from 'formik';
import { useRegister } from '@hooks/useRegister';
import FormRegister from '@components/register/FormRegister';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'red',
    fontSize: 22,
    color: theme.palette.grey[400],
  },
  container: defaultStyle.container,
}));

const Register: FC<any> = ({ message, width }: any) => {
  const classes = useStyles();
  const { handleRegister, initialValuesForm } = useRegister();

  return (
    <div className={classes.container}>
      <Formik initialValues={initialValuesForm} onSubmit={handleRegister} validationSchema={null}>
        <FormRegister />
      </Formik>
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Register',
    },
  };
};

export default withWidth({ noSSR: true })(Register);
