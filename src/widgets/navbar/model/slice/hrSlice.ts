import { createSlice } from "@reduxjs/toolkit";
import { HRSchema } from "../types";

const initialState: HRSchema = {
  isOpen: false,
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { reducer: hrReducer, actions: hrActions } = hrSlice;
