import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PhoneSchema } from "../types";

const initialState: PhoneSchema = {
  phone_number: "+79007776655",
};

const userSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
  },
});

export const { reducer: phoneReducer, actions: phoneActions } = userSlice;
