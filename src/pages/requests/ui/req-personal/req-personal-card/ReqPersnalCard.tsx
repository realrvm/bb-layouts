import { FC } from "react";

import styles from "./styles.module.scss";
import { BackButton } from "@/shared/ui/button";

type ReqPersonalCardProps = Record<string, never>;

export const ReqPersonalCard: FC<ReqPersonalCardProps> = () => {
  return (
    <div className={styles.bb__req_personal_card_wrapper}>
      <BackButton />
      <h2>Банковская карта</h2>
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
