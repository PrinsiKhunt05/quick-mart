import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./Context/AppContext.jsx";
import theme from "./theme.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
