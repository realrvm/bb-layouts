import { FC } from "react";

import { Container } from "@/widgets/container";
import logo from "@/shared/assets/images/logo.png";
import { AppImage } from "@/shared/ui/app-image";

import { AppLink } from "@/shared/ui/app-link/";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { AppLinkThemes } from "@/shared/ui/app-link/types";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";

import styles from "./styles.module.scss";
import { TABLET_WIDTH } from "@/shared/lib/const";
import Hamburger from "hamburger-react";

type NavbarProps = Record<string, never>;

export const Navbar: FC<NavbarProps> = () => {
  const { width } = useWindowWidth();

  return (
    <header className={styles.bb__header}>
      <Container>
        <nav className={styles.bb__main_nav}>
          <div className={styles.bb__main_nav_logo}>
            <AppLink to="/">
              <AppImage src={logo} alt="logo" />
            </AppLink>
            {width > TABLET_WIDTH ? (
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
            ) : null}
          </div>
          {width > TABLET_WIDTH ? (
            <div className={styles.bb__main_nav_action_btns}>
              <AppLink to="/identity" theme={AppLinkThemes.OUTLINE}>
                Личный кабинет
              </AppLink>
              <AppLink to="/get_money" theme={AppLinkThemes.PRIMARY}>
                Получить займ
              </AppLink>
            </div>
          ) : (
            <div className={styles.bb__main_nav_hamburger}>
              <Hamburger
                color={`#969696`}
                size={24}
                onToggle={() => console.log("hamburger")}
              />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};
