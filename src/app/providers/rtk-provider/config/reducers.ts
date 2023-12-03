import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema } from "./StateSchema";

// reducers
import { hrReducer } from "@/widgets/navbar";
import { phoneReducer } from "@/entities/phone";
import { userAccessReducer } from "@/entities/user";
import { loginReducer, regReducer } from "@/features/serve";

export const reducers: ReducersMapObject<StateSchema> = {
  hr: hrReducer,
  phone: phoneReducer,
  reg: regReducer,
  access: userAccessReducer,
  login: loginReducer,
};
