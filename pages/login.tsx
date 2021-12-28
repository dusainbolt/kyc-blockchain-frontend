import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { defaultStyle } from '@styles/theme';
import FormLogin from '@components/authentication/FormLogin';
import { useLogin, useRedirectAuthen } from '@hooks/useLogin';

const useStyles = makeStyles({
  container: defaultStyle.container,
});

const Login: FC<any> = ({ titlePages }) => {
  const classes = useStyles();
  const { handleLogin, initialFormLogin, validateFormLogin, loadingSubmitLogin, errorMessage } = useLogin();
  useRedirectAuthen();
  return (
    <div className={classes.container}>
      <h1>{titlePages}</h1>
      <Formik initialValues={initialFormLogin} onSubmit={handleLogin} validationSchema={yup.object(validateFormLogin)}>
        <FormLogin errorMessage={errorMessage} loadingSubmitLogin={loadingSubmitLogin} />
      </Formik>
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      titlePages: 'Đăng nhập',
    },
  };
};

export default Login;
