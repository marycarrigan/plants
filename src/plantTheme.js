import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Josefin Sans',
      'sans-serif',
    ].join(','),
 },
   palette: {
    primary: {
      main: "#0E5225"
    },
    secondary: {
      main: "#FFFFFF"
    }
  },
  overrides: {

  },
  props: {
    MuiTabs: {
      indicatorColor: "white"
    }
  }
});

export default theme;