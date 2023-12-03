import { FC, useState } from "react";

import styles from "./styles.module.scss";
import { Otp } from "@/features/otp";

type IdentityCheckOutProps = Record<string, never>;

export const IdentityCheckOut: FC<IdentityCheckOutProps> = () => {
  const [otp, setOtp] = useState("");

  return (
    <section className={styles.bb__ident_container}>
      <h2 className={styles.bb__ident_title}>Введите код из СМС</h2>
      <p className={styles.bb__ident_text}>
        Мы отправили код подтверждения на номер 8 (918) 233-23-22
      </p>
      <Otp
        value={otp}
        onChange={(value) => setOtp(value)}
        requestToServer={() => {}}
      />
    </section>
  );
};
