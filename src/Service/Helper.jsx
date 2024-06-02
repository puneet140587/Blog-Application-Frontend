import axios from "axios";
import { getToken } from "../Authentication";

export const BASE_URL = "http://localhost:9090/api/v1";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  // (config) => {
  //   const token = getToken();
  //   console.log(token);

  //   if (token) {
  //     config.headers.common.Authorization = `Bearer ${token}`;
  //     console.log(config);
  //     return config;
  //   }

  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);
