import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";
import { IS_DEV } from "@/shared/lib/const";

import type { StateSchema } from "./StateSchema";
import { $api_query } from "@/shared/api";
import { listenerMiddleware } from "./middlewares";

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: reducers,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat($api_query.middleware),
  });

  return store;
}
