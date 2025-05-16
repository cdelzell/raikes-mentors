import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#d00000",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

export const muiTheme = createTheme(theme);
