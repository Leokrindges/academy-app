import { isAxiosError } from "axios";
import { academyApi } from "./client-http";
import { ResponseAPI } from "./response-api.interface";

// A camada da aplicação responsavel pela:
// COMUNICAÇÃO COM OS ENDPOINTS DAS APIS A SEREM INTEGRADAS

// função de login
export async function loginService(email: string, password: string): Promise<ResponseAPI<string>> {
  // tratamento de erros
  try {
    // Quando a api retorna 200 ..299 - SUCESSO
    const response = await academyApi.post("/auth/login", {
      email: email,
      password: password,
    });

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      // Quando a api retorna qualquer tipo de erro
      return err.response?.data;
    }

    // Ou quando o dev codou errado
    return {
      ok: false,
      message: "Aconteceu um erro inesperado",
    };
  }
}

// função de logout
export async function logoutService(token: string): Promise<ResponseAPI<undefined>> {
  try {
    const response = await academyApi.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      // Quando a api retorna qualquer tipo de erro
      return err.response?.data;
    }

    // Ou quando o dev codou errado
    return {
      ok: false,
      message: "Aconteceu um erro inesperado",
    };
  }
}
