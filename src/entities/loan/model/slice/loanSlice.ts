import { createSlice } from "@reduxjs/toolkit";

import { LoanSchema } from "../types";

const initialState: LoanSchema = {
  term: "24",
  sum: 50000,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: (create) => ({
    setLoan: create.reducer<LoanSchema>((state, { payload }) => {
      state.term = payload.term;
      state.sum = payload.sum;
    }),
  }),
  selectors: {
    getLoan: (state) => state,
  },
});

export const { reducer: loanReducer, actions: loanActions } = loanSlice;

export const { getLoan } = loanSlice.selectors;
