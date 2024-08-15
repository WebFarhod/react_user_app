import axios, { AxiosInstance } from "axios";

export const API_URL = `http://localhost:8080/api`;

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
export default axiosInstance;
