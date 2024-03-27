export { getLoan, loanReducer, loanActions } from "./model/slice/loanSlice";

export type { LoanSchema } from "./model/types";

export { useGetLoans, usePostLoan } from "./model/api/loanApi";
