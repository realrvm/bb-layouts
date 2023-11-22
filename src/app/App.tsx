import { FC } from "react";
import { AppRouter } from "./providers/router-dom-provider";
import { Outlet } from "react-router-dom";

type AppProps = Record<string, never>;

export const App: FC<AppProps> = () => {
  return (
    <AppRouter>
      <Outlet />
    </AppRouter>
  );
};
