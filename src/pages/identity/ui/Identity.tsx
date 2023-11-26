import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavbarSimple } from "@/widgets/navbar";
import { Container } from "@/widgets/container";

type IdentityProps = Record<string, never>;

export const Identity: FC<IdentityProps> = () => {
  return (
    <Container>
      <NavbarSimple className="bb__simple" />
      <Outlet />
    </Container>
  );
};
