/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import axiosInstance, { API_URL } from "./api";

const $api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}`,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axiosInstance.get("/auth/refresh");
        localStorage.setItem("accessToken", data.accessToken);
        return $api.request(originalRequest);
      } catch (error: any) {
        console.log("Not authorized");
      }
    }

    throw error;
  }
);

export default $api;
