export type { AnnuitySchema } from "./model/types";

export { annuityReducer, annuityActions } from "./model/slice/annuitySlice";

export { useGetAnnuityRate, useGetAnnuityApproval } from "./model/api/annuity";
