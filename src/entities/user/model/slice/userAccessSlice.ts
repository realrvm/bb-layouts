import { createSlice } from "@reduxjs/toolkit";

import { UserAccessSchema } from "../types";
import { LOCAL_STORAGE_TOKEN, STORAGE } from "@/shared/lib/const";

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
          STORAGE.setItem(LOCAL_STORAGE_TOKEN, refreshToken);
        }
      },
    ),
  }),
  selectors: {
    getUserAccess: (state) => state.accessToken,
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;

export const { getUserAccess } = userAccessSlice.selectors;
