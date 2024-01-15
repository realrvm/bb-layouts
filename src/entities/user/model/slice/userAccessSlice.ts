import { createSlice } from "@reduxjs/toolkit";
import { UserAccessSchema } from "../types";

const initialState: UserAccessSchema = {
  accessToken: "",
};

const userAccessSlice = createSlice({
  name: "access",
  initialState,
  reducers: (create) => ({
    setUserAccess: create.reducer<string>((state, action) => {
      state.accessToken = action.payload;
    }),
  }),
  selectors: {
    getUserAccess: (state) => state.accessToken,
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;

export const { getUserAccess } = userAccessSlice.selectors;
