import DarkTheme from "@mui/icons-material/Brightness4";
import LightTheme from "@mui/icons-material/Brightness7";
import { Box, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectThemeMode, toggleTheme } from "../../store/modules/theme/themeSlice";

export function Header() {
  const theme = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  return (
    <Box component='header' textAlign='end' paddingY={2} height={"5vh"}>
      <IconButton onClick={() => dispatch(toggleTheme())}>
        {theme === "light" ? <DarkTheme /> : <LightTheme />}
      </IconButton>
    </Box>
  );
}
