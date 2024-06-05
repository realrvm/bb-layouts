import { $api } from "@/shared/api";

import { RegisterResponseSchema, RegisterSchema } from "../types";

const registerApi = $api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterResponseSchema, RegisterSchema>({
      query(regData) {
        return {
          method: "POST",
          url: "/register/",
          body: regData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useRegisterApi = registerApi.useRegisterMutation;
