import { StateSchema } from "@/app/providers/rtk-provider";

export const getHRToggleValue = (state: StateSchema) => state.hr.isOpen;
