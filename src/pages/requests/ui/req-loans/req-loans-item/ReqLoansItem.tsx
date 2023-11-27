import { FC } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

import styles from "./styles.module.scss";

type ReqLoansItemProps = {
  date: string;
  req: string;
  refund: string;
  date_refund: string;
};

export const ReqLoansItem: FC<ReqLoansItemProps> = ({
  date,
  req,
  refund,
  date_refund,
}) => {
  return (
    <div className={styles.bb__req_loans_item}>
      <div className={styles.bb__req_loans_item_info}>
        <span className={styles.bb__req_loans_item_date}>{date}</span>
        <dl className={styles.bb__req_loans_item_info_dl}>
          <dt className={styles.bb__req_loans_item_info_dt}>
            {" "}
            Займ на сумму {req} ₽
          </dt>
          <dd className={styles.bb__req_loans_item_info_dd}>
            <AppLink to="*" theme={AppLinkThemes.CLEAN}>
              Смотреть график платежей
            </AppLink>
          </dd>
        </dl>
      </div>
      <div className={styles.bb__req_loans_item_refund}>
        <dl className={styles.bb__req_loans_item_refund_dl}>
          <dt className={styles.bb__req_loans_item_refund_dt}>{refund} ₽</dt>
          <dd className={styles.bb__req_loans_item_refund_dd}>
            До {date_refund}
          </dd>
        </dl>
        <AppLink to="/requests/req_loans/1" theme={AppLinkThemes.PRIMARY}>
          Погасить
        </AppLink>
      </div>
    </div>
  );
};
