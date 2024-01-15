import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";
import { IS_DEV } from "@/shared/lib/const";

import type { StateSchema, ThunkExtraArgument } from "./StateSchema";
import { $api, $api_query } from "@/shared/api";

const extraArg: ThunkExtraArgument = {
  api: $api,
};

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: reducers,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat($api_query.middleware),
  });

  return store;
}
