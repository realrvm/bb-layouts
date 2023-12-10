import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAccessSchema } from "../types";

const initialState: UserAccessSchema = {
  accessToken: "",
};

const userAccessSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setUserAccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;
