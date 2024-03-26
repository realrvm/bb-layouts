import {
  TypedStartListening,
  TypedStopListening,
  createListenerMiddleware,
} from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../types";
import { $api } from "@/shared/api";
import { LOCAL_STORAGE_SITE_HAS_VISITED } from "@/shared/lib/constants";
import { authActions } from "@/features/auth";

const extraArgument = {
  api: $api,
};

export const listenerMiddleware = createListenerMiddleware({
  extra: extraArgument,
});

const { startListening, stopListening } = listenerMiddleware;

type AppStartListening = TypedStartListening<RootState, AppDispatch>;
type AppStopListening = TypedStopListening<RootState, AppDispatch>;

export const startAppListening = startListening as AppStartListening;
export const stopAppListening = stopListening as AppStopListening;

startAppListening({
  actionCreator: authActions.setAccessToken,
  effect: async (_, listenerApi) => {
    const { delay } = listenerApi;

    await delay(1000);

    window.localStorage.setItem(
      LOCAL_STORAGE_SITE_HAS_VISITED,
      JSON.stringify(Date.now()),
    );
  },
});
