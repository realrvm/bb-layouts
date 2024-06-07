export { getLoan, loanReducer, loanActions } from "./model/slice/loanSlice";

export type { LoanSchema } from "./model/types";

export {
  useGetLoans,
  usePostLoan,
  useExpectedPostLoan,
  useGetLastLoan,
  useLastLoan,
} from "./model/api/loanApi";
