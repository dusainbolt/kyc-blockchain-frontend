import { makeStyles } from '@mui/styles';
import { registerField } from '@type/authtication';
import { IField } from '@type/field';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';

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

const FormRegister: FC<{ loadingSubmitRegister: boolean }> = ({ loadingSubmitRegister }) => {
  const classes = useStyles();
  const { handleSubmit } = useFormikContext();
  return (
    <div className={classes.formWrapper}>
      {Object.entries(registerField).map((item: any[], index: number) => {
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
      <LoadingButton
        color="primary"
        className={classes.buttonSubmit}
        fullWidth
        onClick={handleSubmit as any}
        variant="contained"
        type="submit"
        loading={loadingSubmitRegister}
        loadingPosition="start"
      >
        Đăng ký
      </LoadingButton>
      <Button href="/login">Đăng nhập</Button>
    </div>
  );
};

export default FormRegister;
