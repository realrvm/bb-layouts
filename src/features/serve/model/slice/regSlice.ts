import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegSchema } from "../types";
import { register } from "../api/register";

const initialState: RegSchema = {
  phone_number: "+79007776655",
  isLoading: false,
  error: "",
};

const regSlice = createSlice({
  name: "reg",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: regReducer, actions: regActions } = regSlice;
