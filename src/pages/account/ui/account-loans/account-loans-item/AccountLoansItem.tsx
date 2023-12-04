import { FC, memo } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

import styles from "./styles.module.scss";

type AccountLoansItemProps = {
  date: string;
  req: string;
  refund: string;
  date_refund: string;
};

export const AccountLoansItem: FC<AccountLoansItemProps> = memo(
  ({ req, refund, date_refund }) => {
    return (
      <div className={styles.bb__req_loans_item}>
        <AppLink to="/account/account_loans/1">
          <div className={styles.bb__req_loans_item_info}>
            <span className={styles.bb__req_loans_item_info_loan}>
              Займ на сумму {req} ₽
            </span>
            <span className={styles.bb__req_loans_item_info_refund}>
              {refund} ₽
            </span>
            <span className={styles.bb__req_loans_item_info_term}>
              До {date_refund}
            </span>
          </div>
          <div className={styles.bb__req_loans_item_refund}>
            <div className={styles.bb__req_loans_item_refund_more}>
              Подробнее
            </div>
            <AppLink
              to="/account/account_loans/1"
              theme={AppLinkThemes.PRIMARY}
            >
              Погасить
            </AppLink>
          </div>
        </AppLink>
      </div>
    );
  },
);
