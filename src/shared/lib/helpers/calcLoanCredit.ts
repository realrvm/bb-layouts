import { STEP_LOAN_VALUE } from "@/shared/lib/const";
import { getWithSpaces } from "shared/lib/helpers/addSpacesToInputNumber";

type Step = { amounts: number };

/**
 * The function calculates the correct percentage
 * @param {number} percent - value obtained from the range input
 * @returns {string} - number in string form with spaces
 */
export function calcLoanCredit(percent: number): string {
  const step: Step = { amounts: STEP_LOAN_VALUE * percent };

  const { amounts } = new Proxy(step, {
    get(target: Step, prop: keyof Step) {
      if (target[prop] < STEP_LOAN_VALUE) {
        return getWithSpaces(STEP_LOAN_VALUE);
      } else return getWithSpaces(target[prop]);
    },
  });

  return amounts.toString();
}
