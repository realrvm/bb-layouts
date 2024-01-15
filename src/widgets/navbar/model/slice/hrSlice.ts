import { createSlice } from "@reduxjs/toolkit";

import { HRSchema } from "../types";

const initialState: HRSchema = {
  isOpen: false,
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: (create) => ({
    toggle: create.reducer((state) => {
      state.isOpen = !state.isOpen;
    }),
  }),
  selectors: {
    getHRToggleValue: (state) => state.isOpen,
  },
});

export const { reducer: hrReducer, actions: hrActions } = hrSlice;

export const { getHRToggleValue } = hrSlice.selectors;
