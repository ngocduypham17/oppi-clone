import axios from "axios";
import { ACCESS_TOKEN } from "../constants/localStorage";

const baseService = axios.create();

baseService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseService;