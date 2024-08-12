import axios from "axios";

export const academyApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, // process.env
});
