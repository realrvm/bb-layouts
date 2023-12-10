import { StateSchema } from "@/app/providers/rtk-provider";

export const getUserAccess = (state: StateSchema) => state.access.accessToken;
