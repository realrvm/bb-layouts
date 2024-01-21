import { $api_query } from "@/shared/api";
import { LoansSchema } from "../types";

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
    }),
    overrideExisting: false,
  });

export const useGetLoans = loansApi.useLazyGetLoansQuery;
