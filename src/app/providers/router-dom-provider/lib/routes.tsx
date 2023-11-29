import { createBrowserRouter } from "react-router-dom";

import { App } from "@/app/App";
import { Main } from "@/pages/main";

import { GetMoney, GetMoneyCheckOut, GetMoneyForm } from "@/pages/get-money";
import { Identity, IdentityCheckOut, IdentityForm } from "@/pages/identity";

import { Page404 } from "@/pages/page-404";

import {
  Applying,
  ApplyingAuto,
  ApplyingDocs,
  ApplyingResult,
  ApplyingSum,
} from "@/pages/applying";

import {
  Application,
  ReqAll,
  ReqDocs,
  ReqLoans,
  ReqLoansInfo,
  ReqPersonal,
  ReqPersonalCard,
  ReqPersonalPassport,
  ReqPersonalPts,
  ReqProfile,
  ReqProfileMail,
  ReqProfilePhone,
  Requests,
} from "@/pages/requests";

import { Routes } from "../types";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Page404 />,
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
      {
        path: Routes.APPLYING,
        element: <Applying />,
        children: [
          { path: Routes.APPLYING_AUTO, element: <ApplyingAuto /> },
          { path: Routes.APPLYING_SUM, element: <ApplyingSum /> },
          { path: Routes.APPLYING_DOCS, element: <ApplyingDocs /> },
          { path: Routes.APPLYING_RESULT, element: <ApplyingResult /> },
        ],
      },
      {
        path: Routes.REQUESTS,
        element: <Requests />,
        children: [
          { path: Routes.REQ_ALL, element: <ReqAll /> },
          { path: Routes.REQ_DOCS, element: <ReqDocs /> },
          { path: Routes.REQ_LOANS, element: <ReqLoans /> },
          { path: Routes.REQ_PERSONAL, element: <ReqPersonal /> },
          { path: Routes.REQ_PROFILE, element: <ReqProfile /> },
          { path: Routes.REQ_LOANS_ID, element: <ReqLoansInfo /> },
          {
            path: Routes.REQ_PERSONAL_PASSPORT,
            element: <ReqPersonalPassport />,
          },
          { path: Routes.REQ_PERSONAL_PTS, element: <ReqPersonalPts /> },
          { path: Routes.REQ_PERSONAL_CARD, element: <ReqPersonalCard /> },
          { path: Routes.REQ_PROFILE_MAIL, element: <ReqProfileMail /> },
          { path: Routes.REQ_PROFILE_PHONE, element: <ReqProfilePhone /> },
          { path: Routes.REQUESTS_ID, element: <Application /> },
        ],
      },
    ],
  },
]);
