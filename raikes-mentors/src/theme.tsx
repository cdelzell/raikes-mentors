import { extendTheme } from "@mui/joy/styles";
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

export const theme2 = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#d00000",
          solidColor: "#fff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#d00000",
          solidColor: "#fff",
        },
      },
    },
  },
});

export const joyTheme = extendTheme(theme2);

export const muiTheme = createTheme(theme);
