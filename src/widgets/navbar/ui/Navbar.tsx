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

import { useActionCreators } from "@/app/providers/rtk-provider";
import { targetPathActions } from "@/entities/user";

import { Button, ButtonThemes } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "@/pages/account";
import { useGetLoans } from "@/pages/applying";

import styles from "./styles.module.scss";

type NavbarProps = Record<string, never>;

export const Navbar: FC<NavbarProps> = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { width } = useWindowWidth();
  const actionTargetPath = useActionCreators(targetPathActions);
  const navigate = useNavigate();
  const [getProfile, { isFetching: isProfileFetching }] = useGetProfile();
  const [getLoans, { isFetching: isLoansFetching }] = useGetLoans();

  const handleProfileClick = useCallback(async () => {
    try {
      const profile = await getProfile().unwrap();
      navigate("/account/account_all");
      actionTargetPath.setTargetPath({ targetPath: Paths.PROFILE });
      console.log(profile);
    } catch (e) {
      navigate("/reg/reg_form");
    }
  }, [getProfile, navigate, actionTargetPath]);

  const handleApplyingClick = useCallback(async () => {
    try {
      const loans = await getLoans().unwrap();
      navigate("/applying/applying_sum");
      actionTargetPath.setTargetPath({ targetPath: Paths.APPLYING });
      console.log(loans);
    } catch (e) {
      navigate("/reg/reg_form");
    }
  }, [getLoans, navigate, actionTargetPath]);

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
                onClick={handleApplyingClick}
              >
                Получить займ
              </Button>
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
                  <Button
                    disabled={isLoansFetching}
                    theme={ButtonThemes.PRIMARY}
                    onClick={handleApplyingClick}
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
          )}
        </nav>
      </Container>
    </header>
  );
};
