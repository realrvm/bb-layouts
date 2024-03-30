import { $api } from "@/shared/api";

import { ProfileResponseSchema } from "../types";

const profileApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseSchema, void>({
      query: () => "/profile/",
    }),
    getProfileLoan: builder.query<any, string>({
      query: (id: string) => `/loans/${id}/`,
    }),
  }),
  overrideExisting: false,
});

export const useGetProfile = profileApi.useLazyGetProfileQuery;
export const useProfile = profileApi.useGetProfileQuery;
export const useProfileLoan = profileApi.useLazyGetProfileLoanQuery;
