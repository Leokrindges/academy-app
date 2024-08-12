import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchAllAssessments } from "./assessments.actions";

// 1 - formato de cada dado armazenado na lista
export interface Assessment {
  id: string;
  title: string;
  rate: string;
  deadline: string; // 2024-08-06 ISO8601 primitivos
}

/*

assessments: {
  ids: [],
  entities: {}
}

*/

const assessmentsAdapter = createEntityAdapter({
  selectId: (assessment: Assessment) => assessment.id, // quando é "id" é opcional essa config
  sortComparer: (a, b) => a.title.localeCompare(b.title), // opcional, só se usa se quiser modificar a ordenação do array
});

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState: assessmentsAdapter.getInitialState({
    message: "",
    pagination: {
      limit: 10,
      page: 1,
      count: 0,
      totalPages: 0,
    },
  }),
  reducers: {
    // todas as ações síncronas possíveis para com esse estado

    // add
    addAssessment: assessmentsAdapter.addOne,

    // update
    updateAssessment: assessmentsAdapter.updateOne,

    // delete
    deleteAssessment: assessmentsAdapter.removeOne,

    // reset
    resetAssessments: assessmentsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAssessments.fulfilled, (currentState, action) => {
      // se o payload.ok for true a api respondeu com sucesso
      if (action.payload.ok) {
        // { ids: [], entities: {} }
        assessmentsAdapter.setAll(currentState, action.payload.data!);

        currentState.pagination = action.payload.pagination!;
      }

      currentState.message = action.payload.message;
    });
  },
});

export const { addAssessment, updateAssessment, deleteAssessment, resetAssessments } =
  assessmentsSlice.actions;

export const assessmentsReducer = assessmentsSlice.reducer;

// list - listAssessments
// get - getAssessmentById
export const { selectAll: listAssessments, selectById: getAssessmentById } =
  assessmentsAdapter.getSelectors();

// Componente => Ação Assincrona => Chama a API => API Responde => Estado de avaliações é setado
