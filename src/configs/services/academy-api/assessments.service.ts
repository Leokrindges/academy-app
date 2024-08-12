import { isAxiosError } from "axios";
import { academyApi } from "./client-http";
import { ResponseAPI } from "./response-api.interface";

export interface AssessmentAPI {
  id: string;
  title: string;
  rate: string;
  deadline: string; // "2024-08-08"
  deleted: boolean;
  createdAt: string; // "2024-08-08T03:48:78"
  updatedAt: string;
  deletedAt: string | null;
  studentId: string;
}

// LISTAR TODAS
export async function getAllAssessmentService(
  token: string,
  limit?: number,
  page?: number,
): Promise<ResponseAPI<Array<AssessmentAPI>>> {
  try {
    const response = await academyApi.get("/assessments", {
      headers: {
        Authorization: token,
      },
      params: {
        limit: limit,
        page: page,
      }, // query params
    });

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

// CADASTRAR
//export async function createAssessmentService(): Promise<ResponseAPI<unknown>> {}

// ATUALIZAR
//export async function updateAssessmentService(): Promise<ResponseAPI<unknown>> {}

// DELETAR
//export async function deleteAssessmentService(): Promise<ResponseAPI<unknown>> {}
