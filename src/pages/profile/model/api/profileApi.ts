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
    // TODO тестовый займ УДАЛИТЬ!!!
    getProfileTestLoan: builder.query<any, any>({
      query: () => `/loans/?borrower=15/`,
    }),
    // TODO тестовые платежи УДАЛИТЬ!!!
    getProfileTestLoanPayouts: builder.query<any, any>({
      query: () => `/loans/207/payments/`,
    }),
  }),
  overrideExisting: false,
});

export const useGetProfile = profileApi.useLazyGetProfileQuery;
export const useProfile = profileApi.useGetProfileQuery;
export const useProfileLoan = profileApi.useLazyGetProfileLoanQuery;
// TODO хуки для тестов Удалить!!!
export const useProfileTestLoan = profileApi.useGetProfileTestLoanQuery;
export const useProfileTestLoanPayouts =
  profileApi.useGetProfileTestLoanPayoutsQuery;
