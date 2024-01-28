import { $api_query } from "@/shared/api";
import { ModelObjectRequest, ModelObjectResponse } from "../types";

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
      createModelObject: build.mutation<
        ModelObjectResponse,
        ModelObjectRequest
      >({
        query: (body) => ({
          url: "/vehicles/",
          method: "POST",
          body,
        }),
      }),
      getUrlImagesPresign: build.mutation<
        { url: string },
        { uid: string; file_name: string }
      >({
        query: ({ file_name, uid }) => ({
          url: `/vehicles/${uid}/images/presign/`,
          method: "POST",
          body: { file_name: file_name },
        }),
      }),
    }),
    overrideExisting: false,
  });

export const useGetVehiclesList = vehiclesApi.useLazyGetModelsListQuery;
export const useCreateModel = vehiclesApi.useCreateModelObjectMutation;
export const useGetPresign = vehiclesApi.useGetUrlImagesPresignMutation;
