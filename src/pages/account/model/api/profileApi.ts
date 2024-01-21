import { $api_query } from "@/shared/api";

import { ProfileResponseSchema } from "../types";

const profileApi = $api_query.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseSchema, void>({
      query: () => "/profile/",
    }),
  }),
  overrideExisting: false,
});

export const useGetProfile = profileApi.useLazyGetProfileQuery;
