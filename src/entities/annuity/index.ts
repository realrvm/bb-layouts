export type { AnnuitySchema } from "./model/types";

export { annuityReducer, annuityActions } from "./model/slice/annuitySlice";

export { getAnnuityPeriod } from "./model/selectors/getAnnuityPeriod";

export { useGetAnnuityRate, useGetAnnuityApproval } from "./model/api/annuity";
