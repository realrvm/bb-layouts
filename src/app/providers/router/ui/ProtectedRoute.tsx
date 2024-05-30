import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStateSelector } from "../../rtk";
import { getAccessToken } from "@/features/auth";
import { STORAGE, STORAGE_TOKEN } from "@/shared/lib/constants";

export const ProtectedRoute: FC = () => {
  const accessToken = useStateSelector(getAccessToken);
  const refreshToken = STORAGE.getItem(STORAGE_TOKEN);

  if (!accessToken && !refreshToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
