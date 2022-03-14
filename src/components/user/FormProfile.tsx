import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Typography } from '@mui/material';
import { IField } from '@type/field';
import { profileField } from '@type/profile';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import { editProfileStyle } from './editProfileStyle';

interface FormProfileProps {
  loadingSubmitLogin?: boolean;
  errorMessage?: string;
}

export const FormProfile: FC<FormProfileProps> = ({ loadingSubmitLogin = false }) => {
  const styles = editProfileStyle();
  const { handleSubmit } = useFormikContext();

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Edit Profile
      </Typography>
      <Divider />
      <div className={styles.formWrapper}>
        <Typography variant="h1" component="div" gutterBottom className={styles.titleForm}>
          Profile Edit Form
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(profileField).map((item: any[], index: number) => {
            const field: IField = item[1];
            return (
              <Grid key={index} item xs={field.grid || 6}>
                <Field
                  className={styles.inputField}
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
        <Alert className={styles.buttonSubmit} severity="error">
          {errorMessage}
        </Alert>
      )}
      <Button href="/register">Đăng ký</Button> */}
        <LoadingButton
          color="primary"
          className={styles.buttonSubmit}
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
    </div>
  );
};
