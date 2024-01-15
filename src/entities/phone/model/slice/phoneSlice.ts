import { createSlice } from "@reduxjs/toolkit";

import { PhoneSchema } from "../types";

const initialState: PhoneSchema = {
  phone_number: "",
};

const userSlice = createSlice({
  name: "phone",
  initialState,
  reducers: (create) => ({
    setPhone: create.reducer<string>((state, action) => {
      state.phone_number = action.payload;
    }),
  }),
  selectors: {
    getPhoneNumber: (state) => state.phone_number,
  },
});

export const { reducer: phoneReducer, actions: phoneActions } = userSlice;

export const { getPhoneNumber } = userSlice.selectors;
