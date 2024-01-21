import { createSlice } from "@reduxjs/toolkit";

import { Paths } from "@/shared/lib/types";
import { TargetPathSchema } from "../types";

const initialState: TargetPathSchema = {};

const userAccessSlice = createSlice({
  name: "targetPath",
  initialState,
  reducers: (create) => ({
    setTargetPath: create.reducer<{ targetPath: Paths }>(
      (state, { payload }) => {
        state.targetPath = payload.targetPath;
      },
    ),
  }),
  selectors: {
    getTargetPath: (state) => state.targetPath,
  },
});

export const { reducer: targetPathReducer, actions: targetPathActions } =
  userAccessSlice;

export const { getTargetPath } = userAccessSlice.selectors;
