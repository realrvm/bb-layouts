import { $api_query } from "@/shared/api";

import {
  ObtainRequestSchema,
  ObtainResponseSchema,
  RegDataSchema,
} from "../types";

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
    obtain: build.mutation<ObtainResponseSchema, ObtainRequestSchema>({
      query(obtainData) {
        return {
          method: "POST",
          url: "/token/obtain/",
          body: obtainData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useRegApi = regApi.useRegisterMutation;
export const useObtainApi = regApi.useObtainMutation;
