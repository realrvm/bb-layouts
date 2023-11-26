import { FC } from "react";

import styles from "./styles.module.scss";

type GetMoneyCheckOutProps = Record<string, never>;

export const GetMoneyCheckOut: FC<GetMoneyCheckOutProps> = () => {
  return (
    <section className={styles.bb__gm_container}>
      <h2 className={styles.bb__gm_title}>Введите код из СМС</h2>
      <p className={styles.bb__gm_text}>
        Мы отправили код подтверждения на номер 8 (918) 233-23-22
      </p>
      <div className={styles.bb__gm_footer}>
        <p>Запросить код повторно можно через 32 сек</p>
        <p>
          Ошиблись при вводе номера?<span>Изменить</span>
        </p>
      </div>
    </section>
  );
};
