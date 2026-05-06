import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2563eb", dark: "#1d4ed8" },
    secondary: { main: "#7c3aed" },
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    text: { primary: "#374151", secondary: "#64748b" },
    background: { default: "#ffffff", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
  },
});

export default theme;
