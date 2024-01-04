import { $api_query } from "@/shared/api";

const reportsApi = $api_query
  .enhanceEndpoints({ addTagTypes: ["reports"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getPlateId: build.query<any, { plate: string }>({
        query: (body) => ({
          url: `/reports/make/${body.plate}/`,
          method: "GET",
        }),
      }),
      getAutoDescr: build.query<any, { id: string }>({
        query: (body) => ({ url: `/reports/retrieve/${body.id}` }),
        providesTags: ["reports"],
      }),
    }),
    overrideExisting: false,
  });

export const useGetPlateId = reportsApi.useGetPlateIdQuery;
export const useGetAutoDescr = reportsApi.useGetAutoDescrQuery;
