import { makeStyles } from '@mui/styles';
import {  loginField } from '@type/authentication';
import { IField } from '@type/field';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  inputField: {
    marginTop: 12,
  },
  formWrapper: {
    maxWidth: 500,
    width: '100%',
  },
  buttonSubmit: {
    marginTop: 20,
  },
});

const FormLogin: FC<{loadingSubmitLogin: boolean, errorMessage: string}> = ({loadingSubmitLogin, errorMessage }) => {
  const classes = useStyles();
  const { handleSubmit } = useFormikContext();
  return (
    <div className={classes.formWrapper}>
      {Object.entries(loginField).map((item: any[], index: number) => {
        const field: IField = item[1];
        return (
          <Field
            key={index}
            className={classes.inputField}
            name={field.name}
            label={field.label}
            component={field.component}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            restric={field.restric}
          />
        );
      })}
      {errorMessage && <Alert className={classes.buttonSubmit} severity="error">{errorMessage}</Alert>}
      <LoadingButton
        color="primary"
        className={classes.buttonSubmit}
        fullWidth
        onClick={handleSubmit as any}
        variant="contained"
        type="submit"
        loading={loadingSubmitLogin}
        loadingPosition="start"
      >
        Đăng nhập
      </LoadingButton>
      <Button href="/register">Đăng ký</Button>
    </div>
  );
};

export default FormLogin;
