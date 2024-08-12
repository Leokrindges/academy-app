import { combineReducers } from "@reduxjs/toolkit";
import { assessmentsReducer } from "./assessments/assessmentsSlice";
import { modalReducer } from "./modal/modalSlice";
import { themeReducer } from "./theme/themeSlice";
import { userLoggedReducer } from "./userLogged/userLoggedSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  assessments: assessmentsReducer,
  modal: modalReducer,
  userLogged: userLoggedReducer,
});
