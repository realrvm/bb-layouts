import { useStateSelector } from "@/app/providers/rtk-provider";
import { useGetAnnuityApproval, useGetAnnuityRate } from "@/entities/annuity";
import { getLoanRequestTerm } from "@/entities/user";

export function useLoanCalculator() {
  const { data: rate } = useGetAnnuityRate(
    { count: 5 },
    { refetchOnMountOrArgChange: true },
  );
  const { data: approvalProb } = useGetAnnuityApproval();

  const period = useStateSelector(getLoanRequestTerm);

  return { rate, approvalProb, period };
}
