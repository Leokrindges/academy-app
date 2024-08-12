import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack"; // npm install notistack
import { darkTheme } from "./configs/themes/dark.theme";
import { lightTheme } from "./configs/themes/light.theme";
import { AppRouter } from "./routes/AppRoutes";
import { useAppSelector } from "./store/hooks";
import { selectThemeMode } from "./store/modules/theme/themeSlice";

export function App() {
  const theme = useAppSelector(selectThemeMode);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <SnackbarProvider>
        <CssBaseline />
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
