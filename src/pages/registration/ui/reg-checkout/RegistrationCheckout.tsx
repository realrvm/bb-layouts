import { FC, useCallback, useState } from "react";

import { Otp } from "@/features/otp";

import { getPhoneNumber } from "@/entities/phone";
import {
  useActionCreators,
  useStateSelector,
} from "@/app/providers/rtk-provider";

import { useObtainApi } from "../../model/api/regApi";
import { userAccessActions } from "@/entities/user";

import styles from "./styles.module.scss";

type RegistrationCheckoutProps = Record<string, never>;

export const RegistrationCheckout: FC<RegistrationCheckoutProps> = () => {
  const [otp, setOtp] = useState("");

  const phone = useStateSelector(getPhoneNumber);
  const accessAction = useActionCreators(userAccessActions);
  const [obtain] = useObtainApi();

  const sendToServer = useCallback(async () => {
    try {
      const token = await obtain({
        phone_number: phone,
        password: otp,
      }).unwrap();

      accessAction.setUserAccess(token);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, [phone, otp, obtain, accessAction]);

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
