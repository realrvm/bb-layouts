import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavbarSimple } from "@/widgets/navbar";
import { Container } from "@/widgets/container";

type ApplyingProps = Record<string, never>;

const Applying: FC<ApplyingProps> = () => {
  return (
    <Container>
      <NavbarSimple className="bb__simple" />
      <Outlet />
    </Container>
  );
};

export default Applying;
