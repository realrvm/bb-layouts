import { createAsyncThunk } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_TOKEN } from "@/shared/lib/const";
import { ThunkConfig } from "@/app/providers/rtk-provider";
import { RegSchema, RegValidateErrors } from "../types";

import { validateObtain } from "./validateObtain";
import { userAccessActions } from "@/entities/user";

const serverErrorMessages: Record<string, RegValidateErrors[]> = {
  "Network Error": [RegValidateErrors.SERVER_ERROR],
  "Request failed with status code 403": [RegValidateErrors.NO_USER_FOUND],
};

export const obtain = createAsyncThunk<
  any,
  Pick<RegSchema, "phone_number" | "password">,
  ThunkConfig<RegValidateErrors[]>
>("reg/reg", async (authData, thunkAPI): Promise<any> => {
  const { rejectWithValue, dispatch, extra } = thunkAPI;

  const errors = validateObtain(authData);

  if (errors.length) {
    return rejectWithValue([RegValidateErrors.INCORRECT_USER_DATA]);
  }

  try {
    const response = await extra.api.post<any>("/token/obtain/", authData);

    if (!response.data) {
      return rejectWithValue([RegValidateErrors.NO_DATA]);
    }

    dispatch(userAccessActions.setUserAccess(response.data));

    const token = JSON.stringify(response.data);

    window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);


    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;
      return rejectWithValue(serverErrorMessages[message]);
    }
  }
});
