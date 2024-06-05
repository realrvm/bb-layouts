import { $api } from "@/shared/api";
import { ModelObjectRequest, ModelObjectResponse } from "../types";

const vehiclesApi = $api
  .enhanceEndpoints({ addTagTypes: ["Vehicles"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getModel: build.query<any, string>({
        query: (id: string) => ({
          url: `/vehicles/models/?make=${id}`,
        }),
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
      selectCarData: build.mutation<any, any>({
        query: (body) => ({
          url: "/loans/select_car_data/",
          method: "POST",
          body,
        }),
      }),
      getListVehiclesBrands: build.query<any, void>({
        query: () => ({
          url: "/vehicles/makes/",
        }),
      }),
      getUrlImagesPresign: build.mutation<
        unknown,
        { body: File; uid?: number }
      >({
        query: ({ body, uid = 17 }) => {
          const formData = new FormData();

          formData.append("image", body);

          return {
            url: `/vehicles/${uid}/images/add/`,
            method: "POST",
            body: formData,
          };
        },
      }),
    }),
    overrideExisting: false,
  });

export const useGetModel = vehiclesApi.useLazyGetModelQuery;
export const useCreateModel = vehiclesApi.useCreateModelObjectMutation;
export const useGetPresign = vehiclesApi.useGetUrlImagesPresignMutation;
export const useGetBrands = vehiclesApi.useLazyGetListVehiclesBrandsQuery;
export const useSelectCarData = vehiclesApi.useSelectCarDataMutation;
