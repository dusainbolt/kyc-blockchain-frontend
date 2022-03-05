import { makeStyles } from '@mui/styles';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import FieldText from '@common/FieldInput';

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

const FormOTP: FC<{ loadingSubmitRegister: boolean }> = ({ loadingSubmitRegister }) => {
  const classes = useStyles();
  const { handleSubmit } = useFormikContext();
  return (
    <div className={classes.formWrapper}>
      <p>Lưu ý mã có hiệu lực trong 5p</p>
      <Field className={classes.inputField} name="otp" label="Mã xác thực" component={FieldText} required={true} />
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
    </div>
  );
};

export default FormOTP;
