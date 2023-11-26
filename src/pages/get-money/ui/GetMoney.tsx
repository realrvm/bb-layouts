import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavbarSimple } from "@/widgets/navbar";
import { Container } from "@/widgets/container";

type GetMoneyProps = Record<string, never>;

export const GetMoney: FC<GetMoneyProps> = () => {
  return (
    <Container>
      <NavbarSimple className="bb__simple" />
      <Outlet />
    </Container>
  );
};
