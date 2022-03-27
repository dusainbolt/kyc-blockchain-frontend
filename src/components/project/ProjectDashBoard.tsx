import { CardProject } from '@common/Card/CardProject';
import { SkeletonChildren } from '@common/Skeleton/SkeletonProject';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Typography } from '@mui/material';
import { getProjectSlice } from '@redux/slices/projectSlice';
import { useAppSelector } from '@redux/store';
import { IField } from '@type/field';
import { projectField } from '@type/project';
import { Field, useFormikContext } from 'formik';
import { FC } from 'react';
import { projectDashBoardStyle } from './projectDashBoardStyle';

interface FormProfileProps {
  errorMessage?: string;
}

export const ProjectDashBoard: FC<FormProfileProps> = () => {
  const styles = projectDashBoardStyle();
  const { handleSubmit } = useFormikContext();
  const { data: projectData, loadingData } = useAppSelector(getProjectSlice);

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Project Dashboard
      </Typography>
      <Divider />
      <div className={styles.formWrapper}>
        <Typography variant="h1" component="div" gutterBottom className={styles.titleForm}>
          Create Project Form
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(projectField).map((item: any[], index: number) => {
            const field: IField = item[1];
            return (
              <Grid key={index} item xs={field.grid || 6}>
                <Field {...field} />
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
          loading={loadingData}
          // loadingPosition="start"
        >
          Create
        </LoadingButton>
      </div>

      <Grid className={styles.listProjectWrap} container spacing={2}>
        {projectData.map((item, index) => (
          <Grid item key={index} xs={6}>
            <CardProject project={item} />
          </Grid>
        ))}
      </Grid>
      {loadingData && (
        <Grid className={styles.listProjectWrap} container spacing={2}>
          <Grid item xs={6}>
            <SkeletonChildren />
          </Grid>
          <Grid item xs={6}>
            <SkeletonChildren />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
