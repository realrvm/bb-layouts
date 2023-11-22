import { FC, ReactNode } from "react";

type AppRouterProps = {
  children: ReactNode;
};

export const AppRouter: FC<AppRouterProps> = ({ children }) => {
  return <main>{children}</main>;
};
