const pow = Math.pow.bind(Math);

type Months = "24" | "36" | "48" | "60";

/**
 * Calculates the monthly payment for the term of the loan
 * @param {number} sum - sum of the loan
 * @param {number} period - term of the loan in months
 * @param {number} sum - annual interest rate
 * @param {number} sum - monthly payment
 */
export function calcMonthlyPayment(sum: string, period: Months, rate = 18) {
  const amount = sum.replace(/\D/g, "")

  const monthlyRate = rate / 12 / 100;

  const term = Number(period);

  const annuityCoefficient =
    (monthlyRate * pow(1 + monthlyRate, term)) /
    (pow(1 + monthlyRate, term) - 1);

  return (Number(amount) * annuityCoefficient).toFixed();
}
