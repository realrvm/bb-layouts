import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type ReqProfileItemProps = {
  val: string;
  caption: string;
  path: string;
};

export const ReqProfileItem: FC<ReqProfileItemProps> = ({
  caption,
  val,
  path,
}) => {
  return (
    <div className={styles.bb__req_profile_item}>
      <div className={styles.bb__req_profile_item_wrap}>
        <span className={styles.bb__req_profile_item_val}>{val}</span>
        <span className={styles.bb__req_profile_item_caption}>{caption}</span>
      </div>
      <AppLink to={path} theme={AppLinkThemes.CLEAN}>
        Изменить
      </AppLink>
    </div>
  );
};
