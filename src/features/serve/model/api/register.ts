import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/app/providers/rtk-provider";
import { RegSchema, RegValidateErrors } from "../types";

import { validateReg } from "./validateReg";

const serverErrorMessages: Record<string, RegValidateErrors[]> = {
  "Network Error": [RegValidateErrors.SERVER_ERROR],
  "Request failed with status code 403": [RegValidateErrors.NO_USER_FOUND],
};

export const register = createAsyncThunk<
  any,
  Pick<RegSchema, "phone_number">,
  ThunkConfig<RegValidateErrors[]>
>("reg/reg", async (authData, thunkAPI): Promise<any> => {
  const { rejectWithValue, extra } = thunkAPI;

  const errors = validateReg(authData);

  if (errors.length) {
    return rejectWithValue([RegValidateErrors.INCORRECT_USER_DATA]);
  }

  try {
    const response = await extra.api.post<any>("/register/", authData);

    if (!response.data) {
      return rejectWithValue([RegValidateErrors.NO_DATA]);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;
      return rejectWithValue(serverErrorMessages[message]);
    }
  }
});
