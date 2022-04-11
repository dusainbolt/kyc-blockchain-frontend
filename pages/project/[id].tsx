import ProjectDetail from '@components/project/ProjectDetail';
import { useConnectProvider } from '@hooks/useConnectProvider';
import { getProjectSlice, getProjectStart } from '@redux/slices/projectSlice';
import { useAppSelector, wrapper } from '@redux/store';
import axios from '@request/axios';
import Helper from '@services/helper';
import { SSRContext } from '@type/context';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { END } from 'redux-saga';

const ProjectPage = () => {
  useConnectProvider();

  const { projectDetail } = useAppSelector(getProjectSlice);

  useEffect(() => {
    if (projectDetail?._id) {
      axios.setAPIKeyRequest(projectDetail.apiKey as any);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{projectDetail?.name}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ProjectDetail project={projectDetail as any} />
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store): SSRContext | any =>
    async (context: GetServerSidePropsContext) => {
      await Helper.delay(1500);
      const id: any = context.query.id;
      // regular stuff
      store.dispatch(getProjectStart({ id }));
      // end the saga
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default ProjectPage;
