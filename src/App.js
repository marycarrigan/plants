import Home from "./components/Home";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from "./plantTheme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Home/>
    </ThemeProvider>
  );
}

export default App;
