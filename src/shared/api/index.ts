import axios, { AxiosInstance } from "axios";

import { API_URL, LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";

function createAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const $api_reg = createAxiosInstance();
export const $api = createAxiosInstance();

$api_reg.interceptors.request.use((config) => {
  return config;
});

$api_reg.interceptors.response.use((config) => {
  return config;
});

$api.interceptors.request.use((config) => {
  const token = JSON.parse(
    window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "{}",
  );
  if (token?.access) config.headers.Authorization = `Bearer ${token.access}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const token = JSON.parse(
          window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "{}",
        );

        error.config.headers.Authorization = `Bearer ${token.access}`;

        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: token.refresh,
        });

        if (response.data.access) {
          const newToken = JSON.stringify({
            refresh: token.refresh,
            access: response.data.access,
          });
          window.localStorage.setItem(LOCAL_STORAGE_TOKEN, newToken);
        }

        return $api.request(error.config);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }
  },
);
