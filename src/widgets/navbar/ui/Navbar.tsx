import { FC, memo, useState } from "react";
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

import { Button, ButtonThemes } from "@/shared/ui/button";

import { useHandleProfile } from "@/shared/lib/hooks/useHandleProlile";
import { useHandleApplying } from "@/shared/lib/hooks/useHandleApplying";
import { Paths } from "@/shared/lib/types";

import styles from "./styles.module.scss";

type NavbarProps = Record<string, never>;

type NavbarChildrenProps = {
  handleProfileClick: () => void;
  isLoansFetching: boolean;
  isProfileFetching: boolean;
  handleApplyingClick: (targetPath: Paths) => void;
};

export const Navbar: FC<NavbarProps> = () => {
  const { width } = useWindowWidth();

  const { handleProfileClick, isProfileFetching } = useHandleProfile();
  const { handleApplyingClick, isLoansFetching } = useHandleApplying();

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
            <NavbarDesktop
              handleProfileClick={handleProfileClick}
              handleApplyingClick={handleApplyingClick}
              isLoansFetching={isLoansFetching}
              isProfileFetching={isProfileFetching}
            />
          ) : (
            <NavbarMobile
              handleProfileClick={handleProfileClick}
              handleApplyingClick={handleApplyingClick}
              isLoansFetching={isLoansFetching}
              isProfileFetching={isProfileFetching}
            />
          )}
        </nav>
      </Container>
    </header>
  );
};

const NavbarDesktop: FC<NavbarChildrenProps> = memo(
  ({
    handleProfileClick,
    isLoansFetching,
    isProfileFetching,
    handleApplyingClick,
  }) => {
    return (
      <div className={styles.bb__main_nav_action_btns}>
        <Button
          disabled={isProfileFetching}
          theme={ButtonThemes.OUTLINE}
          onClick={handleProfileClick}
        >
          Личный кабинет
        </Button>
        <Button
          disabled={isLoansFetching}
          theme={ButtonThemes.PRIMARY}
          onClick={() => handleApplyingClick(Paths.APPLYING_SUM)}
        >
          Получить займ
        </Button>
      </div>
    );
  },
);

const NavbarMobile: FC<NavbarChildrenProps> = memo(
  ({
    handleProfileClick,
    isLoansFetching,
    isProfileFetching,
    handleApplyingClick,
  }) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    return (
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
        <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
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
            <Button
              disabled={isLoansFetching}
              theme={ButtonThemes.PRIMARY}
              onClick={() => handleApplyingClick(Paths.APPLYING_SUM)}
            >
              Получить займ
            </Button>
            <Button
              disabled={isProfileFetching}
              theme={ButtonThemes.OUTLINE}
              onClick={handleProfileClick}
            >
              Личный кабинет
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
);
