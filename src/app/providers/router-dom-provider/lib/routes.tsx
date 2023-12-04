import { createBrowserRouter } from "react-router-dom";

import { App } from "@/app/App";
import { Main } from "@/pages/main";

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
  Registration,
  RegistrationCheckout,
  RegistrationForm,
} from "@/pages/registration";

import {
  Account,
  AccountAll,
  AccountDocs,
  AccountLoans,
  AccountPersonal,
  AccountPersonalCard,
  AccountPersonalPassport,
  AccountProfile,
  AccountProfileMail,
  AccountProfilePhone,
  Application,
} from "@/pages/account";

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
        path: Routes.REG,
        element: <Registration />,
        children: [
          { path: Routes.REG_CHECK_OUT, element: <RegistrationCheckout /> },
          { path: Routes.REG_FORM, element: <RegistrationForm /> },
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
        path: Routes.ACCOUNT,
        element: <Account />,
        children: [
          { path: Routes.ACCOUNT_ALL, element: <AccountAll /> },
          { path: Routes.ACCOUNT_DOCS, element: <AccountDocs /> },
          { path: Routes.ACCOUNT_LOANS, element: <AccountLoans /> },
          { path: Routes.ACCOUNT_PERSONAL, element: <AccountPersonal /> },
          { path: Routes.ACCOUNT_PROFILE, element: <AccountProfile /> },
          { path: Routes.ACCOUNT_LOANS_ID, element: <AccountLoans /> },
          {
            path: Routes.ACCOUNT_PERSONAL_PASSPORT,
            element: <AccountPersonalPassport />,
          },
          { path: Routes.ACCOUNT_PERSONAL_PTS, element: <AccountPersonal /> },
          {
            path: Routes.ACCOUNT_PERSONAL_CARD,
            element: <AccountPersonalCard />,
          },
          {
            path: Routes.ACCOUNT_PROFILE_MAIL,
            element: <AccountProfileMail />,
          },
          {
            path: Routes.ACCOUNT_PROFILE_PHONE,
            element: <AccountProfilePhone />,
          },
          { path: Routes.ACCOUNT_ID, element: <Application /> },
        ],
      },
    ],
  },
]);
