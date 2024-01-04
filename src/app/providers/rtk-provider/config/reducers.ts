import { ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";

// reducers
import { hrReducer } from "@/widgets/navbar";
import { phoneReducer } from "@/entities/phone";
import { userAccessReducer } from "@/entities/user";
import { obtainReducer, regReducer } from "@/features/serve";
import { $api_query } from "@/shared/api";

export const reducers: ReducersMapObject<StateSchema> = {
  hr: hrReducer,
  phone: phoneReducer,
  reg: regReducer,
  access: userAccessReducer,
  obtain: obtainReducer,
  [$api_query.reducerPath]: $api_query.reducer,
};
