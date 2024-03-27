import { $api } from "@/shared/api";
import { LoansRequestSchema, LoansResponseSchema, LoansSchema } from "../types";

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
      postLoan: build.mutation<LoansResponseSchema, LoansRequestSchema>({
        query: (loanBody) => ({
          url: `/loans/`,
          method: "POST",
          body: loanBody,
        }),
        invalidatesTags: ["Loans"],
      }),
    }),
    overrideExisting: false,
  });

export const useGetLoans = loanApi.useLazyGetLoansQuery;
export const usePostLoan = loanApi.usePostLoanMutation;
