import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAccessSchema } from "../types";

const initialState: UserAccessSchema = {
  access: "",
};

const userAccessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    setUserAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;
