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

export {
  ProfileMain,
  ProfileActive,
  ProfilePersonal,
  ProfileDocs,
  ProfileClient,
  ProfileMainSchedule,
  ProfileMainApproved,
  ProfileMainPayout,
};

export { useProfile } from "./model/api/profileApi";
