import { makeStyles } from '@mui/styles';
import theme from '@styles/theme';

export const layoutStyle = makeStyles({
  header: {
    position: 'sticky',
    left: 0,
    top: 0,
    zIndex: 10,
    willChange: 'transform',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e8ebed',
    background: '#ffffff',
    height: theme.spacing(8),
    padding: `0 ${theme.spacing(3)}`,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1',
    '& svg': {
      marginRight: '5px',
      width: 36,
      height: 36,
    },
    '& div': {
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
    },
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1',
    border: '1px solid #e8ebed',
    borderRadius: theme.spacing(2),
  },
});
