import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { getProfileSlice } from '@redux/slices/profileSlice';
import { useAppSelector } from '@redux/store';
import { IField } from '@type/field';
import { profileField } from '@type/profile';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import { formProfileStyle } from './formProfileStyle';

interface FormProfileProps {
  loadingSubmitLogin?: boolean;
  errorMessage?: string;
  getInitValues?: any;
}

export const FormProfile: FC<FormProfileProps> = ({ loadingSubmitLogin = false, getInitValues }) => {
  const classes = formProfileStyle();
  const { handleSubmit } = useFormikContext();

  return (
    <div className={classes.formWrapper}>
      <Typography variant="h1" component="div" gutterBottom className={classes.titleForm}>
        Profile Edit Form
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(profileField).map((item: any[], index: number) => {
          const field: IField = item[1];
          return (
            <Grid key={index} item xs={field.grid || 6}>
              <Field
                className={classes.inputField}
                name={field.name}
                label={field.label}
                component={field.component}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                restric={field.restric}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* {errorMessage && (
        <Alert className={classes.buttonSubmit} severity="error">
          {errorMessage}
        </Alert>
      )}
      <Button href="/register">Đăng ký</Button> */}
      <LoadingButton
        color="primary"
        className={classes.buttonSubmit}
        fullWidth
        onClick={handleSubmit as any}
        variant="contained"
        type="submit"
        loading={loadingSubmitLogin}
        // loadingPosition="start"
      >
        Update Profile
      </LoadingButton>
    </div>
  );
};
