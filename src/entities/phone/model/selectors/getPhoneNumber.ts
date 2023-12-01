import { StateSchema } from "@/app/providers/rtk-provider";

export const getPhoneNumber = (state: StateSchema) => state.phone.phone_number;
