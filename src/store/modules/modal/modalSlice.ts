import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "../..";
import { Assessment } from "../assessments/assessmentsSlice";

export interface ModalState {
  defaultValuesInput?: Assessment;
  open: boolean;
  mode: "create" | "update" | null;
}

const initialState: ModalState = {
  open: false,
  mode: null,
};

const modalSlice = createSlice({
  name: "modal-app",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalState>) => {
      state.open = action.payload.open;
      state.mode = action.payload.mode;
      state.defaultValuesInput = action.payload.defaultValuesInput;
    },
  },
});

export const { setModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

export const selectModal = (state: GlobalState) => state.modal;
