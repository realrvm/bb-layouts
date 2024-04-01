import { lazy } from "react";

const ProfileMain = lazy(() => import("./ui/profile-main/ProfileMain"));
const ProfileActive = lazy(() => import("./ui/profile-active/ProfileActive"));
const ProfilePersonal = lazy(
  () => import("./ui/profile-personal/ProfilePersonal"),
);
const ProfileDocs = lazy(() => import("./ui/profile-docs/ProfileDocs"));
const ProfileClient = lazy(() => import("./ui/profile-client/ProfileClient"));
const ProfileMainSchedule = lazy(
  () => import("./ui/profile-main/profile-main-schedule/ProfileMainSchedule"),
);
const ProfileMainApproved = lazy(
  () => import("./ui/profile-main/profile-main-approved/ProfileMainApproved"),
);
const ProfileMainPayout = lazy(
  () => import("./ui/profile-main/profile-main-payout/ProfileMainPayout"),
);
const ProfilePersonalPassport = lazy(
  () =>
    import(
      "./ui/profile-personal/profile-personal-passport/ProfilePersonalPassport"
    ),
);
const ProfilePersonalPts = lazy(
  () => import("./ui/profile-personal/profile-personal-pts/ProfilePersonalPts"),
);
const ProfilePersonalCard = lazy(
  () =>
    import("./ui/profile-personal/profile-personal-card/ProfilePersonalCard"),
);

export {
  ProfileMain,
  ProfileActive,
  ProfilePersonal,
  ProfileDocs,
  ProfileClient,
  ProfileMainSchedule,
  ProfileMainApproved,
  ProfileMainPayout,
  ProfilePersonalPassport,
  ProfilePersonalPts,
  ProfilePersonalCard,
};

export { useProfile } from "./model/api/profileApi";
