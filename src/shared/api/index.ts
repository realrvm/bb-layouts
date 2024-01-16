import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { API_URL, LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";
import { userAccessActions } from "@/entities/user";
import { RootState } from "@/app/providers/rtk-provider/types";

// rtk query
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.access.accessToken;

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

    const response = await baseQuery(
      {
        url: "/token/refresh/",
        body: { refresh: token },
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (response.data) {
      api.dispatch(
        userAccessActions.setUserAccess({
          access: (response.data as { access: string }).access,
        }),
      );
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
