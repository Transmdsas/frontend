import { createTheme } from "@mui/material/styles";
import { esES } from '@mui/x-date-pickers/locales';

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#203764",
    },
    secondary: {
      main: "#DEBB3E",
    },
    background: {
      default: "#f7f5f5",
    },
    text: {
      primary: "#263238",
      secondary: "#254a73",
    },
  },
};

export const Theme = createTheme(themeOptions, esES);
