import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavbarSimple } from "@/widgets/navbar";
import { Container } from "@/widgets/container";

type RegistrationProps = Record<string, never>;

export const Registration: FC<RegistrationProps> = () => {
  return (
    <Container>
      <NavbarSimple className="bb__simple" />
      <Outlet />
    </Container>
  );
};
