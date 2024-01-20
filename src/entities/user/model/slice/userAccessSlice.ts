import { createSlice } from "@reduxjs/toolkit";

import { UserAccessSchema } from "../types";
import { LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";
import { Paths } from "@/shared/lib/types";

const initialState: UserAccessSchema = {
  accessToken: "",
};

const userAccessSlice = createSlice({
  name: "access",
  initialState,
  reducers: (create) => ({
    setUserAccess: create.reducer<{ access: string; refresh?: string }>(
      (state, { payload }) => {
        state.accessToken = payload.access;

        if (payload.refresh) {
          const refreshToken = JSON.stringify(payload.refresh);
          window.localStorage.setItem(LOCAL_STORAGE_TOKEN, refreshToken);
        }
      },
    ),
    setTargetPath: create.reducer<{ targetPath: Paths }>(
      (state, { payload }) => {
        state.targetPath = payload.targetPath;
      },
    ),
  }),
  selectors: {
    getUserAccess: (state) => state.accessToken,
    getTargetPath: (state) => state.targetPath,
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;

export const { getUserAccess, getTargetPath } = userAccessSlice.selectors;
