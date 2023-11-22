import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";
import { IS_DEV } from "@/shared/lib/const";

import type { StateSchema } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: combineReducers(reducers),
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
  });

  return store;
}
