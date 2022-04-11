import { makeStyles } from '@mui/styles';
import theme, { defaultStyle } from '@styles/theme';

export const projectDetailStyle = makeStyles({
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
});
