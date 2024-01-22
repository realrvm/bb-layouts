import { combineSlices } from "@reduxjs/toolkit";

import { StateSchema } from "..";

// reducers
import { phoneReducer } from "@/entities/phone";
import {
  loanRequestReducer,
  targetPathReducer,
  userAccessReducer,
} from "@/entities/user";
import { annuityReducer } from "entities/annuity";
import { $api_query } from "@/shared/api";

export const reducers = combineSlices($api_query, {
  phone: phoneReducer,
  access: userAccessReducer,
  annuity: annuityReducer,
  targetPath: targetPathReducer,
  loanRequest: loanRequestReducer,
}).withLazyLoadedSlices<StateSchema>();
