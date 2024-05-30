import { $api } from "@/shared/api";
import {
  ExpectedLoansRequestSchema,
  LastLoanSchema,
  LoansRequestSchema,
  LoansResponseSchema,
  LoansSchema,
} from "../types";

const loanApi = $api
  .enhanceEndpoints({ addTagTypes: ["Loans"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getLoans: build.query<LoansSchema, void>({
        query: () => ({
          url: `/loans/`,
        }),
        providesTags: ["Loans"],
      }),
      getLastLoan: build.query<LastLoanSchema, void>({
        query: () => ({
          url: `/loans/get_last/`,
        }),
        providesTags: ["Loans"],
      }),
      postLoan: build.mutation<LoansResponseSchema, LoansRequestSchema>({
        query: (loanBody) => ({
          url: `/loans/payments-preview/`,
          method: "POST",
          body: loanBody,
        }),
        invalidatesTags: ["Loans"],
      }),
      postExpectedLoan: build.mutation<any, ExpectedLoansRequestSchema>({
        query: (expectedLoanBody) => ({
          url: `/loans/select_sum/`,
          method: "POST",
          body: expectedLoanBody,
        }),
        invalidatesTags: ["Loans"],
      }),
    }),
    overrideExisting: false,
  });

export const useGetLoans = loanApi.useLazyGetLoansQuery;
export const useGetLastLoan = loanApi.useGetLastLoanQuery;
export const usePostLoan = loanApi.usePostLoanMutation;
export const useExpectedPostLoan = loanApi.usePostExpectedLoanMutation;
