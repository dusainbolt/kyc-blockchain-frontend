import { FC } from 'react';
import { makeStyles } from '@mui/styles';
// import { createTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { useRegister } from '@hooks/useRegister';
import FormRegister from '@components/authentication/FormRegister';
import * as yup from 'yup';
import { defaultStyle } from '@styles/theme';
import { useRedirectAuthen } from '@hooks/useLogin';
import FormOTP from '@components/authentication/FormOTP';

const useStyles = makeStyles({
  container: defaultStyle.container,
});

const Register: FC<any> = ({ titlePages }) => {
  const classes = useStyles();
  const { handleRegister, initialFormRegister, validateForm, loadingSubmitRegister, isWaitOTP, handleSubmitOTP } =
    useRegister();
  useRedirectAuthen();
  return (
    <div className={classes.container}>
      <h1>{titlePages}</h1>
      {!isWaitOTP ? (
        <Formik
          initialValues={initialFormRegister}
          onSubmit={handleRegister}
          validationSchema={yup.object(validateForm)}
        >
          <FormRegister loadingSubmitRegister={loadingSubmitRegister} />
        </Formik>
      ) : (
        <Formik initialValues={{ otp: '' }} onSubmit={handleSubmitOTP}>
          <FormOTP loadingSubmitRegister={loadingSubmitRegister} />
        </Formik>
      )}
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      titlePages: 'Register',
    },
  };
};

export default Register;
