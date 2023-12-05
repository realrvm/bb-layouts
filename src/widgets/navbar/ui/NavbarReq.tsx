import { FC } from "react";

import { Container } from "@/widgets/container";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { AppImage } from "@/shared/ui/app-image";
import logo from "@/shared/assets/images/logo.png";

import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/cn";

type NavbarReqProps = {
  className?: string;
};

export const NavbarReq: FC<NavbarReqProps> = ({ className }) => {
  return (
    <header
      className={cn(styles.bb__header_simple, {}, [className && styles[className]])}
    >
      <Container>
        <nav
          className={cn(styles.bb__main_nav, {}, [
            className && styles[className],
          ])}
        >
          <div className={styles.bb__logo_wrap}>
            <AppLink to="/">
              <AppImage src={logo} alt="logo" />
            </AppLink>
          </div>
          <div
            className={cn(styles.bb__main_nav_action_btns, {}, [
              className && styles[className],
            ])}
          >
            <div className={styles.bb__main_nav_action_id}>
              <span></span>
              <span>ID: 82332344</span>
            </div>
            <AppLink to="/get_money/gm_form" theme={AppLinkThemes.PRIMARY}>
              Получить займ
            </AppLink>
          </div>
        </nav>
      </Container>
    </header>
  );
};
