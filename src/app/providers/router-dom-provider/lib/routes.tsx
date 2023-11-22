import { createBrowserRouter } from "react-router-dom";

import { GetMoney } from "@/pages/get-money";
import { Identity } from "@/pages/identity";
import { App } from "@/app/App";
import { ErrorPage } from "@/pages/error-page";
import { Main } from "@/pages/main";

import { Routes } from "../types";

var routes: Record<Routes, JSX.Element> = {
  [Routes.MAIN]: <Main />,
  [Routes.GET_MONEY]: <GetMoney />,
  [Routes.IDENTITY]: <Identity />,
};

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: Object.entries(routes).map(([path, element]) => ({
      path,
      element,
    })),
  },
]);
