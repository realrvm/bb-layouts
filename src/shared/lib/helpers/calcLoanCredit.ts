import { STEP_LOAN_VALUE } from "@/widgets/calculator/ui/const";

export function calcLoanCredit(percent: number): string {
  const step = STEP_LOAN_VALUE * percent;

  function getWithSpaces(num: number): string {
    return num.toLocaleString().replace(/[,. ]/g, " ");
  }

  return step < STEP_LOAN_VALUE
    ? getWithSpaces(STEP_LOAN_VALUE)
    : getWithSpaces(step);
}
