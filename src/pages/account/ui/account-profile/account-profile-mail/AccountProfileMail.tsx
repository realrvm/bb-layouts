import { FC, useCallback, useState } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";
import { Modal } from "@/features/modal";
import { OtpForm } from "@/features/otp";

type AccountProfileMailProps = Record<string, never>;

export const AccountProfileMail: FC<AccountProfileMailProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [otp, setOtp] = useState("");

  const navigateToNextStep = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return (
    <div className={styles.bb__req_profile_mail_wrapper}>
      <div className={styles.bb__req_profile_mail_title}>
        <BackButton />
        <h2>Почта</h2>
      </div>
      <p>Введите адрес электронной почты, чтобы получать уведомления</p>
      <div className={styles.bb__req_profile_mail_form}>
        <input id="ident_mail" style={{ width: "100%" }} />
        <Button type="submit" onClick={navigateToNextStep}>
          Подтвердить
        </Button>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className={styles.bb__modal_wrapper}>
          <Button
            onClick={() => setIsOpenModal(false)}
            theme={ButtonThemes.CLEAN}
          >
            <span></span>
          </Button>
          <div className={styles.bb__modal_content}>
            <h3>Введите код из письма</h3>
            <p>Письмо с кодом отправлено на адрес</p>
            <span>email@gmail.com</span>
            <OtpForm value={otp} onChange={(value) => setOtp(value)} />
            <Button theme={ButtonThemes.OUTLINE}>Отправить код ещё раз</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
