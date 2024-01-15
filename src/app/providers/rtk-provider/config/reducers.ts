import { combineSlices } from "@reduxjs/toolkit";

// reducers
import { hrReducer } from "@/widgets/navbar";
import { phoneReducer } from "@/entities/phone";
import { userAccessReducer } from "@/entities/user";
import { obtainReducer } from "@/features/serve";
import { annuityReducer } from "entities/annuity";
import { $api_query } from "@/shared/api";

export const reducers = combineSlices($api_query, {
  hr: hrReducer,
  phone: phoneReducer,
  access: userAccessReducer,
  obtain: obtainReducer,
  annuity: annuityReducer,
});
