import { createSlice } from "@reduxjs/toolkit";
import { RegSchema } from "../types";
import { obtain } from "../api/obtain";

const initialState: RegSchema = {
  phone_number: "+79007776655",
  password: "",
  isLoading: false,
  error: "",
};

const obtainSlice = createSlice({
  name: "obtain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtain.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(obtain.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: obtainReducer, actions: obtainActions } = obtainSlice;
