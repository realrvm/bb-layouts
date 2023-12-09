import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";
import { IS_DEV } from "@/shared/lib/const";

import type { StateSchema, ThunkExtraArgument } from "./StateSchema";
import { $api, $api_reg } from "@/shared/api";

const extraArg: ThunkExtraArgument = {
  api: $api,
  api_reg: $api_reg,
};

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: combineReducers(reducers),
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  return store;
}
