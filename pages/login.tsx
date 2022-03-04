import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { defaultStyle } from '@styles/theme';
import FormLogin from '@components/authentication/FormLogin';
import { useLogin, useRedirectAuthen } from '@hooks/useLogin';
import { wrapper } from '@redux/store';
import { SSGContext } from '@type/context';

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

export const getStaticProps = wrapper.getStaticProps(async ({ store }: SSGContext) => {
  try {
    // const paramsTagNew: SearchTagInput = {
    //   key: '',
    //   limit: 5,
    //   offset: 0,
    //   status: [TagStatus.ACTIVE],
    // };
    // const [seoHome, dataTagNew] = await Promise.all([getSeoHomeRequest(), getListTagRequest(paramsTagNew, FETCH_POLICY.NO_CACHE)]);
    // console.log('RESPONSE =============> ', dataTagNew.toString());
    // store.dispatch(getSeoHomeSuccess(seoHome));
    // store.dispatch(getListTagSliceSuccess(dataTagNew));
  } catch (error) {
    console.log('Fetch data error tag index', error);
  }
  return {
    props: {},
    revalidate: 10,
  };
});

// export const getStaticProps = () => {
//   return {
//     props: {
//       titlePages: 'Đăng nhập',
//     },
//   };
// };

export default Login;
