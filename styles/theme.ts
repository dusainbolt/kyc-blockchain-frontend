// styles/theme.ts

import { createTheme } from '@material-ui/core/styles';

type DefaultStyle = {
  container: any;
};

export const defaultStyle: DefaultStyle = {
  container: {
    minHeight: '100vh',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: '#19192B',
      white: '#ffffff',
    },
    primary: {
      light: '#B3E5FC',
      main: '#03A9F4',
      dark: '#0288D1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#607D8B', // omitting light and dark will calculate from main
      contrastText: '#757575',
    },
    grey: {
      '500': '#bcbcbc',
      '700': '#79797a',
    },
    info: {
      main: '#1bb2f1',
    },
    success: {
      main: '#00d589',
    },
    error: {
      main: '#ff4263',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

export default theme;
