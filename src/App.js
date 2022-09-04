import NavBar from "./components/NavBar";
import PlantsTable from "./components/PlantsTable";
import Wishlist from "./components/Wishlist";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import theme from "./plantTheme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="inventory" element={<PlantsTable />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
