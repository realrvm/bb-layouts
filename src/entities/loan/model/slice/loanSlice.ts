import { createSlice } from "@reduxjs/toolkit";

import { LoanSchema } from "../types";

const initialState: LoanSchema = {
  expected_term: "24",
  expected_sum: "50000",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: (create) => ({
    setLoan: create.reducer<LoanSchema>((state, { payload }) => {
      state.expected_term = payload.expected_term;
      state.expected_sum = payload.expected_sum;
    }),
  }),
  selectors: {
    getLoan: (state) => state,
  },
});

export const { reducer: loanReducer, actions: loanActions } = loanSlice;

export const { getLoan } = loanSlice.selectors;
