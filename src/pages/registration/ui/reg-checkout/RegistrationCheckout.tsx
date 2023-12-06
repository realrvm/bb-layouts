import { FC, useState } from "react";

import { Otp } from "@/features/otp";

import { getPhoneNumber } from "@/entities/phone/model/selectors/getPhoneNumber";
import { login, regActions } from "@/features/serve";
import {
  useActionCreators,
  useAppDispatch,
  useStateSelector,
} from "@/app/providers/rtk-provider";

import styles from "./styles.module.scss";

type RegistrationCheckoutProps = Record<string, never>;

export const RegistrationCheckout: FC<RegistrationCheckoutProps> = () => {
  const [otp, setOtp] = useState("");

  const phone = useStateSelector(getPhoneNumber);
  const loginDispatch = useAppDispatch();

  const regAction = useActionCreators(regActions);

  const sendToServer = () => {
    regAction.setPhoneNumber(phone);
    loginDispatch(login({ phone_number: phone, password: otp }));
  };

  if (otp.length === 6) {
    sendToServer();
  }

  return (
    <section className={styles.bb__gm_container}>
      <h2 className={styles.bb__gm_title}>Введите код из СМС</h2>
      <p className={styles.bb__gm_text}>
        Мы отправили код подтверждения на номер {phone}
      </p>
      <Otp
        value={otp}
        onChange={(value) => setOtp(value)}
        requestToServer={sendToServer}
      />
    </section>
  );
};
