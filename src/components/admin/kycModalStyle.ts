import { makeStyles } from '@mui/styles';
import theme from '@styles/theme';

export const kycModalStyle = makeStyles({
  spacingContentSmall: {
    marginTop: theme.spacing(2),
  },
  profileWrap: {
    maxWidth: 700,
    width: '100%',
  },
  profileLabel: {
    fontSize: 18,
    fontWeight: 700,
  },
});
