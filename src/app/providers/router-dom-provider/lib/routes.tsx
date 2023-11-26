import { createBrowserRouter } from "react-router-dom";

import { GetMoney, GetMoneyCheckOut, GetMoneyForm } from "@/pages/get-money";
import { Identity, IdentityCheckOut, IdentityForm } from "@/pages/identity";
import { App } from "@/app/App";
import { ErrorPage } from "@/pages/error-page";
import { Main } from "@/pages/main";

import { Routes } from "../types";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: Routes.MAIN, element: <Main /> },
      {
        path: Routes.IDENTITY,
        element: <Identity />,
        children: [
          { path: Routes.IDENTITY_FORM, element: <IdentityForm /> },
          { path: Routes.IDENTITY_CHECK_OUT, element: <IdentityCheckOut /> },
        ],
      },
      {
        path: Routes.GET_MONEY,
        element: <GetMoney />,
        children: [
          { path: Routes.GM_CHECK_OUT, element: <GetMoneyCheckOut /> },
          { path: Routes.GM_FORM, element: <GetMoneyForm /> },
        ],
      },
    ],
  },
]);
