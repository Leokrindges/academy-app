import { createTheme } from "@mui/material";
import { deepPurple, indigo, red } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: indigo[300],
    },
    secondary: {
      main: deepPurple[500],
    },
    error: {
      main: red[100],
    },
  },
});
