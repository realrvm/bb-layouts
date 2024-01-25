import { FC, useCallback, useState } from "react";

import { Otp } from "@/features/otp";

import { getPhoneNumber } from "@/entities/phone";
import {
  useActionCreators,
  useStateSelector,
} from "@/app/providers/rtk-provider";

import { useObtainApi, useRegApi } from "../../model/api/regApi";
import { getTargetPath, userAccessActions } from "@/entities/user";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

type RegistrationCheckoutProps = Record<string, never>;

export const RegistrationCheckout: FC<RegistrationCheckoutProps> = () => {
  const [otp, setOtp] = useState("");
  const [isResendable, setIsResendable] = useState(true);

  const navigate = useNavigate();

  const [, { isError: isRegisterError }] = useRegApi({
    fixedCacheKey: "shared-register-post",
  });
  const [obtain] = useObtainApi({ fixedCacheKey: "shared-obtain-post" });

  const phone = useStateSelector(getPhoneNumber);
  const targetPath = useStateSelector(getTargetPath);

  const accessAction = useActionCreators(userAccessActions);

  const sendAuthDataToServer = useCallback(async () => {
    try {
      const token = await obtain({
        phone_number: phone,
        password: otp,
      }).unwrap();

      accessAction.setUserAccess(token);
      if (targetPath) navigate(targetPath);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, [otp, phone, targetPath]);

  if (otp.length === 6 && isResendable && !isRegisterError) {
    sendAuthDataToServer();
    setIsResendable(false);
  }

  return (
    <section className={styles.bb__gm_container}>
      <h2 className={styles.bb__gm_title}>Введите код из СМС</h2>
      <p className={styles.bb__gm_text}>
        Мы отправили код подтверждения на номер {phone}
      </p>
      <Otp value={otp} onChange={(value) => setOtp(value)} />
    </section>
  );
};
