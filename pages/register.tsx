import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { defaultStyle } from '@styles/theme';
import { Formik } from 'formik';
import { useRegister } from '@hooks/useRegister';
import FormRegister from '@components/authentication/FormRegister';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  container: defaultStyle.container,
}));

const Register: FC<any> = ({ message, width }: any) => {
  const classes = useStyles();
  const { handleRegister, initialValuesForm, validateForm } = useRegister();

  return (
    <div className={classes.container}>
      <h1>Đăng ký</h1>
      <Formik initialValues={initialValuesForm} onSubmit={handleRegister} validationSchema={yup.object(validateForm)}>
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
