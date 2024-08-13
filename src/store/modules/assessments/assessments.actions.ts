import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAssessmentService,
  getAllAssessmentService,
} from "../../../configs/services/academy-api/assessments.service";

interface FetchAllAssessments {
  token: string;
  limit?: number;
  page?: number;
}
interface CreateAssesments {
  token: string;
  deadline: string;
  rate: string;
  title: string;
}

export const fetchAllAssessments = createAsyncThunk(
  "assessments/getAll", //pq getAll
  async (obj: FetchAllAssessments) => {
    const result = await getAllAssessmentService(obj.token, obj.limit, obj.page);

    return result;
  },
);

export const createAssesments = createAsyncThunk(
  "assesments/create",
  async (obj: CreateAssesments) => {
    const result = await createAssessmentService(obj.token, obj.deadline, obj.rate, obj.title);
    return result;
  },
);
