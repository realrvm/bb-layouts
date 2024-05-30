import { createSlice } from "@reduxjs/toolkit";

import { LoanSchema } from "../types";

const initialState: LoanSchema = {
  appointed_term: "24",
  appointed_sum: 50000,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: (create) => ({
    setLoan: create.reducer<LoanSchema>((state, { payload }) => {
      state.appointed_term = payload.appointed_term;
      state.appointed_sum = payload.appointed_sum;
    }),
  }),
  selectors: {
    getLoan: (state) => state,
  },
});

export const { reducer: loanReducer, actions: loanActions } = loanSlice;

export const { getLoan } = loanSlice.selectors;
