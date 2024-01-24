import { createSlice } from "@reduxjs/toolkit";

import { AnnuitySchema } from "../types";

const initialState: AnnuitySchema = {
  sum: "0",
};

const annuitySlice = createSlice({
  name: "annuity",
  initialState,
  reducers: (create) => ({
    setSum: create.reducer<string>((state, action) => {
      state.sum = action.payload;
    }),
  }),
});

export const { reducer: annuityReducer, actions: annuityActions } =
  annuitySlice;
