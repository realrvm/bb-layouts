import { $api } from "@/shared/api";

import {
  ActiveLoansResponseSchema,
  ProfileIdentitySchema,
  ProfileLoansSchema,
  ProfileResponsePaymentsScheduleSchema,
  ProfileResponseSchema,
  ProfileVehicleSchema,
} from "../types";

const profileApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseSchema, void>({
      query: () => "/profile/",
    }),
    getProfileLoans: builder.query<ProfileLoansSchema, void>({
      query: () => `/loans/`,
    }),
    getActiveLoans: builder.query<ActiveLoansResponseSchema, void>({
      query: () => "/loans/get_active/",
    }),
    getProfileIdentity: builder.query<ProfileIdentitySchema, void>({
      query: () => "/identity/",
    }),
    getProfileVehicle: builder.query<ProfileVehicleSchema, void>({
      query: () => "/vehicle-licenses/",
    }),
    getProfilePaymentsShedule: builder.query<
      ProfileResponsePaymentsScheduleSchema,
      string
    >({
      query: (id: string) => `/loans/${id}/payments/`,
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
export const useProfileLoans = profileApi.useLazyGetProfileLoansQuery;
export const useGetActiveLoans = profileApi.useGetActiveLoansQuery;
export const useGetProfileIdentity = profileApi.useGetProfileIdentityQuery;
export const useGetProfileVehicle = profileApi.useGetProfileVehicleQuery;
export const useGetProfilePaymentsShedule =
  profileApi.useGetProfilePaymentsSheduleQuery;
// TODO хуки для тестов Удалить!!!
export const useProfileTestLoan = profileApi.useGetProfileTestLoanQuery;
export const useProfileTestLoanPayouts =
  profileApi.useGetProfileTestLoanPayoutsQuery;
