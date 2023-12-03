import axios from "axios";

import { API_URL, LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer " + window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.get(`${API_URL}/token/refresh/`, {
          withCredentials: true,
        });

        window.localStorage.setItem(
          LOCAL_STORAGE_TOKEN,
          response.data.refreshToken,
        );

        return $api.request(error.config);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }
  },
);
