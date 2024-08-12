import { createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { GlobalState } from "../..";
import { fetchLogin, fetchLogout } from "./userLogged.actions";

// ESTADOS DE UMA PROMISE - aquela função/rotina que acontece de forma assincrona - fora do ciclo de execução normal
// pending   - ESTA EM PROCESSAMENTO/PENDENTE
// fulfilled - OK/RESOLVIDA
// reject    - NÃO-OK/RECUSADA

export interface UserLoggedState {
  logged: boolean;
  authToken: string;
  emailUser: string;
}

const initialState: UserLoggedState = {
  logged: false,
  authToken: "",
  emailUser: "",
};

const userLoggedSlice = createSlice({
  name: "user-logged",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
      ex: criação de um loading

        builder.addCase(login.pending, (state, action) => {
        // toda lógica de modificação de user-logged para quando a requisição estiver sendo processada (carregando)
        });
    */

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // toda lógica de modificação de user-logged para quando a requisição estiver terminar de ser processada
      state.logged = action.payload.isLogged; // isso aqui é pra mostrar que não precisa ser exatamente os mesmos nomes de props do estado
      state.authToken = action.payload.authToken;
      state.emailUser = action.payload.emailUser;

      enqueueSnackbar(action.payload.message, {
        variant: action.payload.isLogged ? "success" : "error",
      });
    });

    /*
      // aqui seria equivalente ao catch de uma promise
      builder.addCase(login.rejected, (state, action) => {
          // aqui executa somente se a lógica do thunk estourar uma exceção
      });
    */

    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.logoutIsOk) {
        state.logged = initialState.logged;
        state.emailUser = initialState.emailUser;
        state.authToken = initialState.authToken;
      }

      enqueueSnackbar(action.payload.message, {
        variant: action.payload.logoutIsOk ? "success" : "error",
      });
    });
  },
});

export const userLoggedReducer = userLoggedSlice.reducer;
export const selectUserLogged = (state: GlobalState) => state.userLogged;
