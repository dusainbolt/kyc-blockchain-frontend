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
  spacingContentSmall: {
    marginTop: theme.spacing(2),
  },
  btnMetamask: {
    ...defaultStyle.btnStyle('#dc6a00', '#dc6a001c'),
    '& .icon-metamask': {
      width: 32,
    },
  },
  btnWalletConnect: {
    borderColor: '#5dabfc',
    color: '#5dabfc',
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
