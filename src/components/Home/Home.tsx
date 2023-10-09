import { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { brown, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import NewNote from "./NewNote";
import Notes from "./Notes";
import TextEditor from "./TextEditor";
import DeleteModal from "./DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const Home = () => {
  const paletteMode = localStorage.getItem("paletteMode");
  const palette = paletteMode === "dark" ? "dark" : "light";
  const [mode, setMode] = useState<"dark" | "light">(palette);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? grey[400] : brown[400],
          },
          background: {
            default: mode === "dark" ? grey[900] : brown[50],
            paper: mode === "dark" ? grey[900] : grey[50],
          },
          text: {
            primary: mode === "dark" ? grey[50] : grey[900],
            secondary: mode === "dark" ? grey[100] : grey[800],
          },
        },
      }),
    [mode]
  );

  return (
    <>
      <ToastContainer hideProgressBar theme={mode} />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Box
            sx={{
              height: "100vh",
              overflow: "auto",
              bgcolor: "background.default",
            }}
          >
            <div className="notes-container">
              <NewNote />
              <Notes />
            </div>
          </Box>
          <TextEditor />
          <DeleteModal />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default Home;
