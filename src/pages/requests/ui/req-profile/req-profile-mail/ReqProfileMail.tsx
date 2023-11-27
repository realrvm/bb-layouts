import { FC, useCallback, useState } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";
import { Modal } from "@/features/modal";

type ReqProfileMailProps = Record<string, never>;

export const ReqProfileMail: FC<ReqProfileMailProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigateToNextStep = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return (
    <div className={styles.bb__req_profile_mail_wrapper}>
      <BackButton />
      <h2>Почта</h2>
      <p>Введите адрес электронной почты, чтобы получать уведомления</p>
      <div className={styles.bb__req_profile_mail_form}>
        <input
          id="ident_mail"
          title="Введите номер телефона в формате +7 XXX XXX XX XX"
        />
        <Button type="submit" onClick={navigateToNextStep}>
          Подтвердить
        </Button>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className={styles.bb__modal_content}>
          <Button
            onClick={() => setIsOpenModal(false)}
            theme={ButtonThemes.CLEAN}
          >
            <span></span>
          </Button>
          <h3>Введите код из письма</h3>
          <p>Письмо с кодом отправлено на адрес</p>
          <span>email@gmail.com</span>
          <Button theme={ButtonThemes.OUTLINE}>Отправить код ещё раз</Button>
        </div>
      </Modal>
    </div>
  );
};
