import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema } from "./StateSchema";

// reducers
import { hrReducer } from "@/widgets/navbar";

export const reducers: ReducersMapObject<StateSchema> = {
  hr: hrReducer,
};
