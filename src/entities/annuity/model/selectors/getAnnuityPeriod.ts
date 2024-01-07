import { StateSchema } from "@/app/providers/rtk-provider";

export const getAnnuityPeriod = (state: StateSchema) => state.annuity.period;
