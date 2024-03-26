import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";

import type { Schema } from "./schema";
import { $api } from "@/shared/api";
import { IS_DEV } from "@/shared/lib/constants";
import { listenerMiddleware } from "./middlewares";

export function createReduxStore(initialState?: Schema) {
  const store = configureStore({
    reducer: reducers,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat($api.middleware),
  });

  return store;
}
