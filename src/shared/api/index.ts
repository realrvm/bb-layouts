import axios, { AxiosInstance } from "axios";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { API_URL, LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";
import { RootStateType } from "@/app/providers/rtk-provider";
import { userAccessActions } from "@/entities/user";
import { RootState } from "@/app/providers/rtk-provider/types";

let store: RootStateType;

/**
 * Use the Redux store in non-component files
 * See {@link https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files}
 */
export const injectStore = (_store: RootStateType) => {
  store = _store;
};

function createAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: API_URL,
  });
}

export const $api = createAxiosInstance();

$api.interceptors.request.use((config) => {
  const token = store.getState().access.accessToken as string;

  if (token) config.headers.Authorization = `Bearer ${token}`;

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
          window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "",
        ) as string;

        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: token,
        });

        if (response.data) {
          store.dispatch(userAccessActions.setUserAccess(response.data.access));
        }

        return $api.request(error.config);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }
  },
);

// rtk query
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const store = getState() as RootState;
    const token = store.access.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const token = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_TOKEN) || "",
    ) as string;

    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: token,
    });

    if (response.data) {
      api.dispatch(userAccessActions.setUserAccess(response.data.access));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const $api_query = createApi({
  reducerPath: "apiQuery",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
