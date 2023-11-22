import { createReduxStore } from "../config/root";

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
