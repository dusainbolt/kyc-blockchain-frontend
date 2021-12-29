import { useDashboard } from '@hooks/useDashboard';
import { makeStyles } from '@mui/styles';
import { disconnectUser, getAuthenSlice, updateUsers } from '@redux/slices/authentication';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { defaultStyle } from '@styles/theme';
import { FC, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Avatar, Container, FormControl, InputLabel, Select, Stack, MenuItem } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Role } from '@type/authorisation';
import Helper from '@services/helper';
import { LoadingButton } from '@mui/lab';
import theme from '@styles/theme';

const useStyles = makeStyles({
  main: defaultStyle.main,
  cardUser: {
    padding: 10,
    border: `solid 1px ${theme.palette.primary.main}`,
    borderRadius: 12,
  },
  buttonLogout: {
    marginTop: 100,
  },
});

const Home: FC<any> = ({ message }: any) => {
  const classes = useStyles();
  const { currentUser, users } = useAppSelector(getAuthenSlice);
  const [loadingDisconnect, setLoadingDisconnect] = useState<boolean>(false);
  const { getRole } = useDashboard();
  const dispatch = useAppDispatch();

  const handleChange =
    (key: number) =>
    ({ target: { value } }: FormEvent<HTMLInputElement>) => {
      const newUsers = users.map((item, index) => (index === key ? { ...item, role: value } : item));
      dispatch(updateUsers(newUsers));
    };

  const onDisconnect = async (values: any) => {
    dispatch(disconnectUser());
    setLoadingDisconnect(true);
    await Helper.delay(1500);
    window.open('/login', '_self');
  };

  return (
    <main className={classes.main}>
      <Container fixed>
        {currentUser?.username && (
          <>
            {!!getRole(currentUser?.role) && <div>{`Bạn là  ${getRole(currentUser?.role)}`}</div>}
            <Typography variant="h2" component="h2" gutterBottom>
              {`${message} ${currentUser?.username}`}
            </Typography>
          </>
        )}
        {currentUser?.role === Role.ADMIN && (
          <Grid container spacing={2}>
            {users.map(
              (user, index) =>
                user.username !== currentUser?.username && (
                  <Grid item xs={3}>
                    <Stack
                      className={classes.cardUser}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}>
                        {user.username?.split('')[0]}
                      </Avatar>
                      <Typography variant="h4" component="h4" gutterBottom>
                        {user.username}
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Phân quyền</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={user.role}
                          label={getRole(user.role)}
                          onChange={handleChange(index) as any}
                        >
                          <MenuItem value={Role.ADMIN}>{getRole(Role.ADMIN)}</MenuItem>
                          <MenuItem value={Role.USER}>{getRole(Role.USER)}</MenuItem>
                          <MenuItem value={Role.MANAGER}>{getRole(Role.MANAGER)}</MenuItem>
                          <MenuItem value={Role.MEMBER}>{getRole(Role.MEMBER)}</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                )
            )}
          </Grid>
        )}
        <LoadingButton
          className={classes.buttonLogout}
          onClick={onDisconnect}
          loading={loadingDisconnect}
          loadingPosition="start"
        >
          Đăng xuất
        </LoadingButton>
      </Container>
    </main>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Chào Mừng',
    },
  };
};

export default Home;
