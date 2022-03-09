// import { useDashboard } from '@hooks/useDashboard';
// import { disconnectUser, getAuthSlice, updateUsers } from '@redux/slices/authtication';
// import { useAppDispatch, useAppSelector } from '@redux/store';
import { FC, Fragment } from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { Avatar, Container, FormControl, InputLabel, Select, Stack, MenuItem } from '@mui/material';
// import { deepOrange } from '@mui/material/colors';
// import { Role } from '@type/authorisation';
// import Helper from '@services/helper';
// import { LoadingButton } from '@mui/lab';
import { wrapper } from '@redux/store';
import { SSGContext } from '@type/context';
import Head from 'next/head';
// import { Typography } from '@mui/material';
import HomePageComponent from '@components/index/HomePage';
import { useConnectProvider } from '@hooks/useConnectProvider';

const Home: FC<any> = () => {
  useConnectProvider();

  // const classes = useStyles();
  // const { currentUser, users } = useAppSelector(getAuthSlice);
  // const [loadingDisconnect, setLoadingDisconnect] = useState<boolean>(false);
  // const { getRole } = useDashboard();
  // const dispatch = useAppDispatch();

  // const handleChange =
  //   (key: number) =>
  //   ({ target: { value } }: FormEvent<HTMLInputElement>) => {
  //     const newUsers = users.map((item, index) => (index === key ? { ...item, role: value } : item));
  //     dispatch(updateUsers(newUsers));
  //   };

  // const onDisconnect = async (values: any) => {
  //   dispatch(disconnectUser());
  //   setLoadingDisconnect(true);
  //   await Helper.delay(1500);
  //   window.open('/login', '_self');
  // };

  return (
    <Fragment>
      <Head>
        <title>KYC Platform Home</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <HomePageComponent />
    </Fragment>
  );
};

export const getStaticProps = wrapper.getStaticProps((): SSGContext | any => async () => {
  // await Helper.delay(5000);
});

export default Home;
