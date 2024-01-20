import { FC, useState, useCallback } from "react";
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
import { Paths } from "@/shared/lib/types";

import styles from "./styles.module.scss";
import { useActionCreators } from "@/app/providers/rtk-provider";
import { userAccessActions } from "@/entities/user";

type NavbarProps = Record<string, never>;

export const Navbar: FC<NavbarProps> = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { width } = useWindowWidth();
  const actionTargetPath = useActionCreators(userAccessActions);

  const handleAnchorClick = useCallback(
    (targetPath: Paths) => {
      actionTargetPath.setTargetPath({ targetPath });
    },
    [actionTargetPath],
  );

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
                <AppLink to="*" theme={AppLinkThemes.WO_HOVER}>
                  Клиентам
                </AppLink>
                <AppLink to="*" theme={AppLinkThemes.CLEAN}>
                  Агентам
                </AppLink>
              </div>
            ) : null}
          </div>
          {width > TABLET_WIDTH ? (
            <div className={styles.bb__main_nav_action_btns}>
              <AppLink
                to="/account/account_all"
                theme={AppLinkThemes.OUTLINE}
                onClick={() => handleAnchorClick(Paths.PROFILE)}
              >
                Личный кабинет
              </AppLink>
              <AppLink
                to="/applying/applying_sum"
                theme={AppLinkThemes.PRIMARY}
                onClick={() => handleAnchorClick(Paths.APPLYING)}
              >
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
                  <AppLink to="*" theme={AppLinkThemes.PRIMARY}>
                    Клиентам
                  </AppLink>
                  <AppLink to="*" theme={AppLinkThemes.CLEAN}>
                    Агентам
                  </AppLink>
                </div>
                <div
                  className={cn(styles.bb__main_nav_action_btns, {}, [
                    styles["mobile"],
                  ])}
                >
                  <AppLink
                    to="/applying/applying_sum"
                    theme={AppLinkThemes.PRIMARY}
                    onClick={() => handleAnchorClick(Paths.PROFILE)}
                  >
                    Получить займ
                  </AppLink>
                  <AppLink
                    to="/account/account_all"
                    theme={AppLinkThemes.OUTLINE}
                    onClick={() => handleAnchorClick(Paths.PROFILE)}
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
