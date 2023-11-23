import { FC } from "react";

import { Container } from "@/widgets/container";
import logo from "@/shared/assets/images/logo.png";
import { AppImage } from "@/shared/ui/app-image";

import { AppLink } from "@/shared/ui/app-link/";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { AppLinkThemes } from "@/shared/ui/app-link/types";

import styles from "./styles.module.scss";

type NavbarProps = Record<string, never>;

export const Navbar: FC<NavbarProps> = () => {
  return (
    <header className={styles.bb__header}>
      <Container>
        <nav className={styles.bb__main_nav}>
          <div className={styles.bb__main_nav_logo}>
            <AppLink to="/">
              <AppImage src={logo} alt="logo" />
            </AppLink>
            <div className={styles.bb__main_nav_logo_btns}>
              <Button onClick={() => console.log("to clients")}>
                Клиентам
              </Button>
              <Button
                onClick={() => console.log("to agents")}
                theme={ButtonThemes.CLEAN}
              >
                Агентам
              </Button>
            </div>
          </div>
          <div className={styles.bb__main_nav_action_btns}>
            <AppLink to="/identity" theme={AppLinkThemes.OUTLINE}>
              Личный кабинет
            </AppLink>
            <AppLink to="/get_money" theme={AppLinkThemes.PRIMARY}>
              Получить займ
            </AppLink>
          </div>
        </nav>
      </Container>
    </header>
  );
};
