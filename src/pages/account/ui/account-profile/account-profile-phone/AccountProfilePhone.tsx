import { FC, useCallback, useState } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import { Modal } from "@/features/modal";
import { OtpForm } from "@/features/otp";

import styles from "./styles.module.scss";
import { InputMask } from "@/shared/ui/input-mask";

type AccountProfilePhoneProps = Record<string, never>;

export const AccountProfilePhone: FC<AccountProfilePhoneProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [otp, setOtp] = useState("");

  const navigateToNextStep = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);
  return (
    <div className={styles.bb__req_profile_phone_wrapper}>
      <div className={styles.bb__req_profile_phone_title}>
        <BackButton />
        <h2>Телефонный номер</h2>
      </div>
      <p>
        Введите новый номер телефона, который будет привязан к вашему аккаунту
      </p>
      <div className={styles.bb__req_profile_phone_form}>
        <InputMask setCard={() => {}} />
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
            <h3>Введите код из SMS для подтверждения</h3>
            <p>SMS-сообщение отправлено на номер</p>
            <span>+7 ··· ··· ·· 27</span>
            <OtpForm value={otp} onChange={(value) => setOtp(value)} />
            <Button theme={ButtonThemes.OUTLINE}>Отправить код ещё раз</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
