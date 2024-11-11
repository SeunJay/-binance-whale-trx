import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:6001/api",
});
