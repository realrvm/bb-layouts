// TODO удалить!!! проверка обновления токена
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/app/providers/rtk-provider";
import { RegValidateErrors } from "../types";

const serverErrorMessages: Record<string, RegValidateErrors[]> = {
  "Network Error": [RegValidateErrors.SERVER_ERROR],
  "Request failed with status code 403": [RegValidateErrors.NO_USER_FOUND],
};

export const get = createAsyncThunk<any, any, ThunkConfig<RegValidateErrors[]>>(
  "get",
  async (_, thunkAPI): Promise<any> => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<any>("/reports/make/Н492ТЕ198/");
      console.log(response.data)

      if (!response.data) {
        return rejectWithValue([RegValidateErrors.NO_DATA]);
      }
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        return rejectWithValue(serverErrorMessages[message]);
      }
    }
  },
);
