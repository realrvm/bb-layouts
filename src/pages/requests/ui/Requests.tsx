import { FC } from "react";

import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import { NavbarReq } from "@/widgets/navbar";
import { Sidebar } from "@/widgets/sidebar";
import { Container } from "@/widgets/container";

type RequestsProps = Record<string, never>;

export const Requests: FC<RequestsProps> = () => {
  return (
    <>
      <NavbarReq className="bb__req" />
      <Container>
        <div className={styles.bb__req}>
          <Sidebar />
          <Outlet />
        </div>
      </Container>
    </>
  );
};
