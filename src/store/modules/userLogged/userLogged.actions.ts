import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, logoutService } from "../../../configs/services/academy-api/auth.service";

// asyncThunk - prover o payload assincrono para o reducer poder fazer a lógica de modificação do estado global

interface Credentials {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk("userLogged/login", async (credentials: Credentials) => {
  // lógica de chamada ao service e toda validação necessária antes de setar o estado de userLogged
  const result = await loginService(credentials.email, credentials.password);

  // payload a ser enviado para o reducer (gerente)
  return {
    isLogged: result.ok,
    authToken: result.data ?? "",
    emailUser: result.ok ? credentials.email : "",
    message: result.message,
  };
});

export const fetchLogout = createAsyncThunk("userLogged/logout", async (tokenUser: string) => {
  // vai chamar coisas assincronas, então precisa usar o await
  const result = await logoutService(tokenUser);

  // result.ok = é o OK para logout
  return {
    logoutIsOk: result.ok,
    message: result.message,
  };
});
