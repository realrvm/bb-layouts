import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema } from "./StateSchema";

// reducers
import { hrReducer } from "@/widgets/navbar";
import { phoneReducer } from "@/entities/phone";
import { regReducer } from "@/features/reg";

export const reducers: ReducersMapObject<StateSchema> = {
  hr: hrReducer,
  phone: phoneReducer,
  reg: regReducer,
};
