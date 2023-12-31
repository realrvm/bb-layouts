import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { App } from "@/app/App";
import { Main } from "@/pages/main";

import { Identity, IdentityCheckOut, IdentityForm } from "@/pages/identity";

import { Page404 } from "@/pages/page-404";

import { ProtectedRoute } from "../ui/ProtectedRoute";

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
  AccountLoansInfo,
  AccountPersonal,
  AccountPersonalCard,
  AccountPersonalPassport,
  AccountPersonalPts,
  AccountProfile,
  AccountProfileMail,
  AccountProfilePhone,
  Application,
} from "@/pages/account";

import { Routes } from "../types";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: (
      <Suspense fallback={null}>
        <Page404 />
      </Suspense>
    ),
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
        element: (
          <Suspense fallback={null}>
            <Applying />
          </Suspense>
        ),
        children: [
          { path: Routes.APPLYING_AUTO, element: <ApplyingAuto /> },
          {
            path: Routes.APPLYING_SUM,
            element: (
              <Suspense fallback={null}>
                <ApplyingSum />
              </Suspense>
            ),
          },
          { path: Routes.APPLYING_DOCS, element: <ApplyingDocs /> },
          { path: Routes.APPLYING_RESULT, element: <ApplyingResult /> },
        ],
      },
      {
        path: Routes.ACCOUNT,
        element: <ProtectedRoute />,
        children: [
          {
            path: Routes.ACCOUNT,
            element: <Account />,
            children: [
              { path: Routes.ACCOUNT_ALL, element: <AccountAll /> },
              { path: Routes.ACCOUNT_DOCS, element: <AccountDocs /> },
              { path: Routes.ACCOUNT_LOANS, element: <AccountLoans /> },
              { path: Routes.ACCOUNT_PERSONAL, element: <AccountPersonal /> },
              { path: Routes.ACCOUNT_PROFILE, element: <AccountProfile /> },
              { path: Routes.ACCOUNT_LOANS_ID, element: <AccountLoansInfo /> },
              {
                path: Routes.ACCOUNT_PERSONAL_PASSPORT,
                element: <AccountPersonalPassport />,
              },
              {
                path: Routes.ACCOUNT_PERSONAL_PTS,
                element: <AccountPersonalPts />,
              },
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
    ],
  },
]);
