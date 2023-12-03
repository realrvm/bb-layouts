import axios from "axios";

import { API_URL, LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "X-Custom-Header",
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((config) => {
  const token = JSON.parse(
    window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "{}",
  );
  config.headers.Authorization = `Bearer ${token.access}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          headers: {
            "Access-Control-Allow-Origin": "X-Custom-Header",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(
                window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "{}",
              ).refresh
            }`,
          },
        });

        window.localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data);

        return $api.request(error.config);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }
  },
);
