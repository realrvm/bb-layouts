import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegSchema } from "../types";
import { login } from "../api/login";

const initialState: RegSchema = {
  phone_number: "+79007776655",
  password: "",
  isLoading: false,
  error: "",
};

login(initialState)

const regSlice = createSlice({
  name: "reg",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setOtpPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
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

export const { reducer: regReducer, actions: regActions } = regSlice;
