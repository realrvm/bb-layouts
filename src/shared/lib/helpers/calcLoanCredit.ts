import { MAX_LOAN_VALUE, MIN_LOAN_VALUE } from "@/shared/lib/const";
import { getWithSpaces } from "shared/lib/helpers/addSpacesToInputNumber";

type Step = { amounts: number };

/**
 * The function calculates the correct percentage
 * @param {number} percent - value obtained from the range input
 * @returns {string} - number in string form with spaces
 */
export function calcLoanCredit(percent: number): string {
  const step: Step = { amounts: (MAX_LOAN_VALUE / 100) * percent };

  const { amounts } = new Proxy(step, {
    get(target: Step, prop: keyof Step) {
      if (target[prop] < MIN_LOAN_VALUE) {
        return getWithSpaces(MIN_LOAN_VALUE);
      } else if (target[prop] > MAX_LOAN_VALUE) {
        return getWithSpaces(MAX_LOAN_VALUE);
      } else return getWithSpaces(target[prop]);
    },
  });

  return amounts.toString();
}
