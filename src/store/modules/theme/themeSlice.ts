import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

// 1- formato do estado global para tema
export interface ThemeApp {
  mode: "light" | "dark";
}

// 2 - valor inicial deste estado
const initialState: ThemeApp = {
  mode: "light",
};

// 3 - slice
const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      switch (state.mode) {
        case "light":
          state.mode = "dark";
          break;
        case "dark":
          state.mode = "light";
          break;
      }
    },
  },
});

// 4 - exportar as actions, reducer e criar a função de busca do valor do estado de tema
export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const selectThemeMode = (globalState: GlobalState) => globalState.theme.mode;
