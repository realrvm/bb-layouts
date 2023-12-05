import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { AppImage } from "@/shared/ui/app-image";
import logo from "@/shared/assets/images/logo.png";

import { cn } from "@/shared/lib/cn";
import { Modal } from "@/features/modal";
import { Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type NavbarSimpleProps = {
  className?: string;
};

export const NavbarSimple: FC<NavbarSimpleProps> = ({ className }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const showCheckModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return (
    <>
      <header
        className={cn(styles.bb__header_simple, {}, [className && styles[className]])}
      >
        <nav
          className={cn(styles.bb__main_nav, {}, [
            className && styles[className],
          ])}
        >
          <div className={styles.bb__logo_wrap}>
            <Button onClick={showCheckModal} theme={ButtonThemes.CLEAN}>
              <AppImage src={logo} alt="logo" />
            </Button>
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
      </header>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className={styles.bb__modal_nav_wrapper}>
          <Button
            onClick={() => setIsOpenModal(false)}
            theme={ButtonThemes.CLEAN}
          >
            <span></span>
          </Button>
          <div className={styles.bb__modal_nav_content}>
            <h4>Прервать оформление заявки?</h4>
            <p>Введённые данные не будут сохранены.</p>
            <div className={styles.bb__modal_nav_btns}>
              <Button
                theme={ButtonThemes.OUTLINE}
                onClick={() => setIsOpenModal(false)}
              >
                Остаться
              </Button>
              <Button
                theme={ButtonThemes.PRIMARY}
                onClick={() => navigate("/")}
              >
                Прервать
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
