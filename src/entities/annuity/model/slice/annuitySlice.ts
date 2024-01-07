import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnnuitySchema } from "../types";

const initialState: AnnuitySchema = {
  sum: "0",
  period: "24",
};

const annuitySlice = createSlice({
  name: "annuity",
  initialState,
  reducers: {
    setSum: (state, action: PayloadAction<string>) => {
      state.sum = action.payload;
    },
    setPeriod: (state, action: PayloadAction<"24" | "36" | "48" | "60">) => {
      state.period = action.payload;
    },
  },
});

export const { reducer: annuityReducer, actions: annuityActions } =
  annuitySlice;
