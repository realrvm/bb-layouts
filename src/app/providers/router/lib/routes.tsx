import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Main } from "@/pages/main";
import { Routes } from "@/shared/lib/enums";
import { AuthApplication, AuthOTP, AuthProfile } from "@/pages/auth";
import {
  ApplicationCalculator,
  ApplicationDocs,
  ApplicationReview,
  ApplicationVehicle,
} from "@/pages/application";
import { NotFound } from "@/pages/not-found";
import { Loading } from "@/pages/loading";
import { ProtectedRoute } from "../ui/ProtectedRoute";
import {
  ProfileActive,
  ProfileClient,
  ProfileClientMail,
  ProfileClientPhone,
  ProfileDocs,
  ProfileMain,
  ProfileMainApproved,
  ProfileMainConsidered,
  ProfileMainPayout,
  ProfileMainRefused,
  ProfileMainSchedule,
  ProfilePersonal,
  ProfilePersonalCard,
  ProfilePersonalPassport,
  ProfilePersonalPts,
} from "@/pages/profile";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    path: Routes.MAIN,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: `${Routes.AUTH}/profile`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthProfile />
          </Suspense>
        ),
      },
      {
        path: `${Routes.AUTH}/application`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthApplication />
          </Suspense>
        ),
      },
      {
        path: `${Routes.AUTH}/otp`,
        element: (
          <Suspense fallback={<Loading />}>
            <AuthOTP />
          </Suspense>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: `${Routes.APPLICATION}/calculator`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationCalculator />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/vehicle`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationVehicle />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/docs`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationDocs />
              </Suspense>
            ),
          },
          {
            path: `${Routes.APPLICATION}/review`,
            element: (
              <Suspense fallback={<Loading />}>
                <ApplicationReview />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileMain />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main/:id/schedule`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileMainSchedule />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main/:id/approved`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileMainApproved />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main/:id/payout`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileMainPayout />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/main/:id/refused`,
            element: <ProfileMainRefused />,
          },
          {
            path: `${Routes.PROFILE}/main/:id/considered`,
            element: <ProfileMainConsidered />,
          },
          {
            path: `${Routes.PROFILE}/active`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileActive />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/personal`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfilePersonal />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/personal/passport`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfilePersonalPassport />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/personal/pts`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfilePersonalPts />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/personal/card`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfilePersonalCard />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/docs`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileDocs />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/client`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileClient />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/client/phone`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileClientPhone />
              </Suspense>
            ),
          },
          {
            path: `${Routes.PROFILE}/client/mail`,
            element: (
              <Suspense fallback={<Loading />}>
                <ProfileClientMail />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
