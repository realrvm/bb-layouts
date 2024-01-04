import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

import { injectStore } from "@/shared/api";

import { createReduxStore } from "../config/root";
import { StateSchema } from "../config/StateSchema";

type StoreProviderProps = {
  children: ReactNode;
  initialState?: StateSchema;
};

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
}) => {
  const store = createReduxStore(initialState);

  injectStore(store);

  return <Provider store={store}>{children}</Provider>;
};
