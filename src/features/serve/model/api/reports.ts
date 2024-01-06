import { $api_query } from "@/shared/api";

const reportsApi = $api_query
  .enhanceEndpoints({ addTagTypes: ["plate", "autoData"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getPlateId: build.query<any, { plate: string }>({
        query: (body) => ({
          url: `/reports/make/${body.plate}/`,
        }),
        providesTags: ["plate"],
      }),
      getAutoDescr: build.query<any, { id: string }>({
        query: (body) => ({ url: `/reports/retrieve/${body.id}` }),
        providesTags: ["autoData"],
      }),
    }),
    overrideExisting: true,
  });

export const useGetPlateId = reportsApi.useGetPlateIdQuery;
export const useGetAutoDescr = reportsApi.useGetAutoDescrQuery;
