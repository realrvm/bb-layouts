import { calcLoanCredit } from "../calcLoanCredit";

describe('calcLoanCredit', () => {
  it('should return a string with spaces instead of commas and periods', () => {
    expect(calcLoanCredit(0.5)).toBe('50 000');
  });

  it('should return a string with spaces instead of commas and periods for numbers with decimals', () => {
    expect(calcLoanCredit(0.51)).toBe('50 000');
  });
});
