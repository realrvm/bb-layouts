import { createSlice } from "@reduxjs/toolkit";
import { RegSchema } from "../types";
import { login } from "../api/login";

const initialState: RegSchema = {
  phone_number: "+79007776655",
  password: "",
  isLoading: false,
  error: "",
};

const regSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: loginReducer, actions: loginActions } = regSlice;
