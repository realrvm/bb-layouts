import { createSlice } from "@reduxjs/toolkit";

import { LoanRequestSchema } from "../types";

const initialState: LoanRequestSchema = {
  sum: "50000",
  term: "24",
};

const loanRequestSlice = createSlice({
  name: "loanRequest",
  initialState,
  reducers: (create) => ({
    setLoanRequestSum: create.reducer<Pick<LoanRequestSchema, "sum">>(
      (state, { payload }) => {
        state.sum = payload.sum;
      },
    ),
    setLoanRequestTerm: create.reducer<Pick<LoanRequestSchema, "term">>(
      (state, { payload }) => {
        state.term = payload.term;
      },
    ),
    setLoanRequestBorrower: create.reducer<Pick<LoanRequestSchema, "borrower">>(
      (state, { payload }) => {
        state.borrower = payload.borrower;
      },
    ),
  }),
  selectors: {
    getLoanRequestSum: (state) => state.sum,
    getLoanRequestTerm: (state) => state.term,
    getLoanRequestBorrower: (state) => state.borrower,
  },
});

export const { reducer: loanRequestReducer, actions: loanRequestActions } =
  loanRequestSlice;

export const { getLoanRequestSum, getLoanRequestTerm, getLoanRequestBorrower } =
  loanRequestSlice.selectors;
