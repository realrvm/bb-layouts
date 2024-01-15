import { $api_query } from "@/shared/api";

import { RegDataSchema } from "../types";

const regApi = $api_query.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegDataSchema, RegDataSchema>({
      query(authData) {
        return {
          method: "POST",
          url: "/register/",
          body: authData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useRegApi = regApi.useRegisterMutation;
