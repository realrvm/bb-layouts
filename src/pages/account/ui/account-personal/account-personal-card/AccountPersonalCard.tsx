import { FC } from "react";

import { BackButton } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type AccountPersonalCardProps = Record<string, never>;

export const AccountPersonalCard: FC<AccountPersonalCardProps> = () => {
  return (
    <div className={styles.bb__req_personal_card_wrapper}>
      <div className={styles.bb__req_personal_card_title}>
        <BackButton />
        <h2>Банковская карта</h2>
      </div>
      <div className={styles.bb__req_personal_card_inner}>
        <p className={styles.bb__req_personal_card_name}>
          IGOREV IGOR IGOREVICH
        </p>
        <div className={styles.bb__req_personal_card_number}>
          <span>0722</span>
          <span>4233</span>
          <span>4244</span>
          <span>4224</span>
        </div>
        <div className={styles.bb__req_personal_card_info}>
          <span>10/28</span>
          <span>VISA</span>
        </div>
      </div>
    </div>
  );
};
