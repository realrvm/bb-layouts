import { $api_query } from "@/shared/api";

const vehiclesApi = $api_query
  .enhanceEndpoints({ addTagTypes: ["Vehicles"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getModelsList: build.query<any, void>({
        query: () => ({
          url: `/vehicles/models/`,
        }),
        providesTags: ["Vehicles"],
      }),
    }),
    overrideExisting: false,
  });

export const useGetVehiclesList = vehiclesApi.useLazyGetModelsListQuery;
