import { FC } from "react";

import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import { NavbarReq } from "@/widgets/navbar";
import { Sidebar, SidebarMobile } from "@/widgets/sidebar";
import { Container } from "@/widgets/container";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { NOTEBOOK_WIDTH } from "@/shared/lib/const";

type RequestsProps = Record<string, never>;

export const Requests: FC<RequestsProps> = () => {
  const { width } = useWindowWidth();

  return (
    <>
      <NavbarReq className="bb__req" />
      <Container>
        <div className={styles.bb__req}>
          {width > NOTEBOOK_WIDTH ? <Sidebar /> : <SidebarMobile />}
          <Outlet />
        </div>
      </Container>
    </>
  );
};
