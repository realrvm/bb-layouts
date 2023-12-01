import { FC, useState } from "react";
import Hamburger from "hamburger-react";

import { Container } from "@/widgets/container";
import logo from "@/shared/assets/images/logo.png";
import { AppImage } from "@/shared/ui/app-image";

import { AppLink } from "@/shared/ui/app-link/";
import { AppLinkThemes } from "@/shared/ui/app-link/types";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { Drawer } from "@/features/drawer";

import { cn } from "@/shared/lib/cn";
import { TABLET_WIDTH } from "@/shared/lib/const";

import styles from "./styles.module.scss";

type NavbarProps = Record<string, never>;

export const Navbar: FC<NavbarProps> = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
                <AppLink
                  to="/applying/applying_sum"
                  theme={AppLinkThemes.WO_HOVER}
                >
                  Клиентам
                </AppLink>
                <AppLink to="/requests/req_all" theme={AppLinkThemes.CLEAN}>
                  Агентам
                </AppLink>
              </div>
            ) : null}
          </div>
          {width > TABLET_WIDTH ? (
            <div className={styles.bb__main_nav_action_btns}>
              <AppLink
                to="/identity/identity_form"
                theme={AppLinkThemes.OUTLINE}
              >
                Личный кабинет
              </AppLink>
              <AppLink to="/get_money/gm_form" theme={AppLinkThemes.PRIMARY}>
                Получить займ
              </AppLink>
            </div>
          ) : (
            <>
              <div
                className={cn(styles.bb__main_nav_hamburger, {
                  [styles["open"]]: isOpenDrawer,
                })}
              >
                <Hamburger
                  color={`#fff`}
                  size={24}
                  onToggle={() => setIsOpenDrawer(!isOpenDrawer)}
                  toggled={isOpenDrawer}
                />
              </div>
              <Drawer
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
              >
                <div
                  className={cn(styles.bb__main_nav_logo_btns, {}, [
                    styles["mobile"],
                  ])}
                >
                  <AppLink
                    to="/applying/applying_sum"
                    theme={AppLinkThemes.PRIMARY}
                  >
                    Клиентам
                  </AppLink>
                  <AppLink to="/requests/req_all" theme={AppLinkThemes.CLEAN}>
                    Агентам
                  </AppLink>
                </div>
                <div
                  className={cn(styles.bb__main_nav_action_btns, {}, [
                    styles["mobile"],
                  ])}
                >
                  <AppLink
                    to="/get_money/gm_form"
                    theme={AppLinkThemes.PRIMARY}
                  >
                    Получить займ
                  </AppLink>
                  <AppLink
                    to="/identity/identity_form"
                    theme={AppLinkThemes.OUTLINE}
                  >
                    Личный кабинет
                  </AppLink>
                </div>
              </Drawer>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};
