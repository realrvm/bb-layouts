import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink } from "@/shared/ui/app-link";

type AccountProfileItemProps = {
  val: string;
  caption: string;
  path: string;
};

export const AccountProfileItem: FC<AccountProfileItemProps> = ({
  caption,
  val,
  path,
}) => {
  return (
    <div className={styles.bb__req_profile_item}>
      <AppLink to={path}>
        <div className={styles.bb__req_profile_item_wrap}>
          <span className={styles.bb__req_profile_item_val}>{val}</span>
          <span className={styles.bb__req_profile_item_caption}>{caption}</span>
        </div>
        <div className={styles.bb__req_profile_item_more}>Изменить</div>
      </AppLink>
    </div>
  );
};
