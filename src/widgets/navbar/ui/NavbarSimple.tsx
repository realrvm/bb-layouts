import { FC } from "react";

import { Container } from "@/widgets/container";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { AppImage } from "@/shared/ui/app-image";
import logo from "@/shared/assets/images/logo.png";

import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/cn";

type NavbarSimpleProps = {
  className?: string;
};

export const NavbarSimple: FC<NavbarSimpleProps> = ({ className }) => {
  return (
    <header
      className={cn(styles.bb__header, {}, [className && styles[className]])}
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
            <AppLink
              to="https://telegram.me/company_Name4343"
              title="Telegram"
              target="_blank"
              theme={AppLinkThemes.CLEAN}
            >
              <span className={styles.bb__icon_telegram}></span>
              Telegram
            </AppLink>
            <AppLink
              to="whatsapp://send?phone=1234567890"
              title="Whatsapp"
              target="_blank"
              theme={AppLinkThemes.CLEAN}
            >
              <span className={styles.bb__icon_whatsapp}></span>
              WhatsApp
            </AppLink>
          </div>
        </nav>
      </Container>
    </header>
  );
};
