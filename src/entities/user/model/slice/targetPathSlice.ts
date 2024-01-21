import { createSlice } from "@reduxjs/toolkit";

import { Paths } from "@/shared/lib/types";
import { TargetPathSchema } from "../types";

const initialState: TargetPathSchema = {
  targetPath: Paths.PROFILE,
};

const targetPathSlice = createSlice({
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
  targetPathSlice;

export const { getTargetPath } = targetPathSlice.selectors;
