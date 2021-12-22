import { FC } from 'react';
import { makeStyles } from '@mui/styles';
// import { createTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { useRegister } from '@hooks/useRegister';
import FormRegister from '@components/authentication/FormRegister';
import * as yup from 'yup';
import { defaultStyle } from '@styles/theme';

const useStyles = makeStyles({
  container: defaultStyle.container,
});

const Register: FC<any> = ({ titlePages }) => {
  const classes = useStyles();
  const { handleRegister, initialValuesForm, validateForm } = useRegister();

  return (
    <div className={classes.container}>
      <h1>{titlePages}</h1>
      <Formik initialValues={initialValuesForm} onSubmit={handleRegister} validationSchema={yup.object(validateForm)}>
        <FormRegister />
      </Formik>
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
