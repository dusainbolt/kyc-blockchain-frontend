import { makeStyles } from '@mui/styles';
import theme, { defaultStyle } from '@styles/theme';

export const useStyles = makeStyles({
  main: defaultStyle.main,
  title: {
    fontSize: 58,
  },
  spacingContent: {
    marginTop: theme.spacing(4),
  },
  btnMetamask: {
    borderColor: 'red',
  },
  //   btnGroup: {
  //     marginTop: theme.spacing(4),
  //   },
  //   cardUser: {
  //     padding: 10,
  //     border: `solid 1px ${theme.palette.primary.main}`,
  //     borderRadius: 12,
  //   },
  //   buttonLogout: {
  //     marginTop: 100,
  //   },
});
