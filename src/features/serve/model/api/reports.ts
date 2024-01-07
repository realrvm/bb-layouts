import { $api_query } from "@/shared/api";
import { ReportsPlateSchema } from "../types";

const reportsApi = $api_query
  .enhanceEndpoints({ addTagTypes: ["plate"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getPlateId: build.query<ReportsPlateSchema, { plate: string }>({
        query: ({ plate }) => ({
          url: `/reports/make/${plate}/`,
        }),
        providesTags: ["plate"],
      }),
      getAutoDescr: build.query<any, { id: string }>({
        query: ({ id }) => ({ url: `/reports/retrieve/${id}` }),
        providesTags: ["plate"],
      }),
    }),
    overrideExisting: false,
  });

export const useGetPlateId = reportsApi.useGetPlateIdQuery;
export const useGetAutoDescr = reportsApi.useGetAutoDescrQuery;
