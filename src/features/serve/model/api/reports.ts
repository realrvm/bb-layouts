import { $api_query } from "@/shared/api";
import { ReportsPlateSchema } from "../types";

const reportsApi = $api_query.injectEndpoints({
  endpoints: (build) => ({
    getPlateId: build.query<ReportsPlateSchema, { plate: string }>({
      query: ({ plate }) => ({
        url: `/reports/make/${plate}/`,
      }),
    }),
    getAutoDescr: build.query<any, { id: string }>({
      query: ({ id }) => ({ url: `/reports/retrieve/${id}` }),
    }),
  }),
  overrideExisting: false,
});

export const useGetPlateId = reportsApi.useLazyGetPlateIdQuery;
export const useGetAutoDescr = reportsApi.useLazyGetAutoDescrQuery;
