import { $api_query } from "@/shared/api";
import { LoansRequestSchema, LoansResponseSchema, LoansSchema } from "../types";

const loansApi = $api_query
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

export const useGetLoans = loansApi.useLazyGetLoansQuery;
export const usePostLoan = loansApi.usePostLoanMutation;
