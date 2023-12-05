import { FC } from "react";

import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import { NavbarReq } from "@/widgets/navbar";
import { Sidebar  } from "@/widgets/sidebar";
import { Container  } from "@/widgets/container";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { NOTEBOOK_WIDTH } from "@/shared/lib/const";

type AccountProps = Record<string, never>;

export const Account: FC<AccountProps> = () => {
  const { width } = useWindowWidth();

  return (
    <>
      <NavbarReq className="bb__req" />
      {width > NOTEBOOK_WIDTH ? (
        <Container>
          <div className={styles.bb__req}>
            <Sidebar />
            <Outlet />
          </div>
        </Container>
      ) : (
        <div className={styles.bb__req_mobile}>
          <Container>
            <Outlet />
          </Container>
        </div>
      )}
    </>
  );
};
