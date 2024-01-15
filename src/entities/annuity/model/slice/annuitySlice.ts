import { createSlice } from "@reduxjs/toolkit";

import { AnnuitySchema } from "../types";
import { Months } from "@/shared/lib/types";

const initialState: AnnuitySchema = {
  sum: "0",
  period: "24",
};

const annuitySlice = createSlice({
  name: "annuity",
  initialState,
  reducers: (create) => ({
    setSum: create.reducer<string>((state, action) => {
      state.sum = action.payload;
    }),
    setPeriod: create.reducer<Months>((state, action) => {
      state.period = action.payload;
    }),
  }),
  selectors: {
    getAnnuityPeriod: (state) => state.period,
  },
});

export const { reducer: annuityReducer, actions: annuityActions } =
  annuitySlice;

export const { getAnnuityPeriod } = annuitySlice.selectors;
