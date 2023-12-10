import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateSelector } from "@/app/providers/rtk-provider";
import { getUserAccess } from "@/entities/user";

type ProtectedRouteProps = Record<string, never>;

export const ProtectedRoute: FC<ProtectedRouteProps> = () => {
  const token = useStateSelector(getUserAccess);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
