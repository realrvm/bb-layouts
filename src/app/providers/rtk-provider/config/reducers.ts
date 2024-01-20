import { combineSlices } from "@reduxjs/toolkit";

import { StateSchema } from "..";

// reducers
import { hrReducer } from "@/widgets/navbar";
import { phoneReducer } from "@/entities/phone";
import { userAccessReducer } from "@/entities/user";
import { annuityReducer } from "entities/annuity";
import { $api_query } from "@/shared/api";

export const reducers = combineSlices($api_query, {
  hr: hrReducer,
  phone: phoneReducer,
  access: userAccessReducer,
  annuity: annuityReducer,
}).withLazyLoadedSlices<StateSchema>();
