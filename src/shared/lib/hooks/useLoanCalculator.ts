import { useStateSelector } from "@/app/providers/rtk-provider";
import {
  getAnnuityPeriod,
  useGetAnnuityApproval,
  useGetAnnuityRate,
} from "@/entities/annuity";

export function useLoanCalculator() {
  const { data: rate } = useGetAnnuityRate();
  const { data: approvalProb } = useGetAnnuityApproval();

  const period = useStateSelector(getAnnuityPeriod);

  return { rate, approvalProb, period };
}
