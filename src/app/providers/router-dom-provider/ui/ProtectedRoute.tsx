import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = Record<string, never>;

export const ProtectedRoute: FC<ProtectedRouteProps> = () => {
  const token = JSON.parse(window.localStorage.getItem("token") || "{}");

  if (!token?.access) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
