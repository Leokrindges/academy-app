import axios from "axios";

export const academyApi = axios.create({
  baseURL: "https://pokemon.api.com", // process.env
});
