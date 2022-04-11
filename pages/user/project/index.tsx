import { Layout } from '@common/Layout';
import { ProjectDashBoard } from '@components/project/ProjectDashBoard';
import { CreateProjectBody } from '@redux/action/projectAction';
import { openDialogApp } from '@redux/slices/layoutSlice';
import { createProjectStart, searchProjectStart } from '@redux/slices/projectSlice';
import { useAppDispatch } from '@redux/store';
import { TableHelper } from '@services/table';
import { BreadcrumbsType } from '@type/layout';
import { Formik } from 'formik';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';

const ProjectDashBoardPage = () => {
  const dispatch = useAppDispatch();
  const breadcrumbs: BreadcrumbsType[] = [
    {
      text: 'Dashboard',
    },
  ];

  const onSubmitForm = (values: CreateProjectBody) => {
    dispatch(
      openDialogApp({
        title: 'Create project',
        description: 'Are you sure to create this project',
        callbackOk: () => dispatch(createProjectStart(values)),
      })
    );
  };

  const getInitValues = useMemo(() => {
    return {
      name: '',
      avatar: '',
    };
  }, []);

  useEffect(() => {
    dispatch(searchProjectStart({ ...TableHelper.queryDefault, pageSize: 1000000 }));
  }, []);

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Head>
        <title>Project Management</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Formik onSubmit={onSubmitForm} initialValues={getInitValues as any}>
        <ProjectDashBoard />
      </Formik>
    </Layout>
  );
};

export default ProjectDashBoardPage;
