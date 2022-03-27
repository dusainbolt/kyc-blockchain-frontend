import { makeStyles } from '@mui/styles';
import theme from '@styles/theme';

export const projectDashBoardStyle = makeStyles({
  inputField: {
    marginTop: theme.spacing(1),
  },
  formWrapper: {
    maxWidth: 500,
    width: '100%',
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
  titleForm: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  buttonSubmit: {
    marginTop: 20,
  },
  listProjectWrap: {
    maxWidth: 1000,
    margin: 'auto',
    marginTop: 50,
  },
});
