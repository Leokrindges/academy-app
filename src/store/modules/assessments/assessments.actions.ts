import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAssessmentService } from "../../../configs/services/academy-api/assessments.service";

interface FetchAllAssessments {
  token: string;
  limit?: number;
  page?: number;
}

export const fetchAllAssessments = createAsyncThunk(
  "assessments/getAll",
  async (obj: FetchAllAssessments) => {
    const result = await getAllAssessmentService(obj.token, obj.limit, obj.page);

    return result;
  },
);
