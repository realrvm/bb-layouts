import { FC } from "react";

import { AppLink } from "@/shared/ui/app-link";

import styles from "./styles.module.scss";

type AccountPersonalItemProps = {
  val: string;
  path: string;
};

export const AccountPersonalItem: FC<AccountPersonalItemProps> = ({
  val,
  path,
}) => {
  return (
    <div className={styles.bb__req_personal_item}>
      <AppLink to={path}>
        <span className={styles.bb__req_personal_item_val}>{val}</span>
        <div className={styles.bb__req_personal_item_more}>Подробнее</div>
      </AppLink>
    </div>
  );
};
