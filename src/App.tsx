import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown, grey } from "@mui/material/colors";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const theme = createTheme({
  palette: {
    primary: {
      main: brown[400],
    },
    secondary: {
      main: grey[600],
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route element={<Login />} path="/login" />
              <Route element={<SignUp />} path="/signup" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
