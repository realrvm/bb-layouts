import { $api_query } from "@/shared/api";
import { AnnuityApprovalSchema, AnnuityRateSchema } from "../types";

const annuityApi = $api_query.injectEndpoints({
  endpoints: (build) => ({
    getAnnuityRate: build.query<number, any>({
      query: () => ({
        url: `/config/?name=INTEREST_RATE`,
      }),
      transformResponse: (response: AnnuityRateSchema[]) => response[0].value,
    }),
    getAnnuityApproval: build.query<AnnuityApprovalSchema[], void>({
      query: () => ({
        url: `/config/?name=APPROVAL_PROB`,
      }),
      transformResponse: (response: AnnuityApprovalSchema[]) => {
        const result: AnnuityApprovalSchema[] = [];

        response.forEach((e) => {
          result.push({ help_text: e.help_text, value: e.value });
        });

        return result;
      },
    }),
  }),
  overrideExisting: false,
});

export const useGetAnnuityRate = annuityApi.useGetAnnuityRateQuery;
export const useGetAnnuityApproval = annuityApi.useGetAnnuityApprovalQuery;
