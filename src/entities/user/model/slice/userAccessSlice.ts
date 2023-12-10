import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenType, UserAccessSchema } from "../types";

const initialState: UserAccessSchema = {
  token: {},
};

const userAccessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    setUserAccess: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload;
    },
  },
});

export const { reducer: userAccessReducer, actions: userAccessActions } =
  userAccessSlice;
