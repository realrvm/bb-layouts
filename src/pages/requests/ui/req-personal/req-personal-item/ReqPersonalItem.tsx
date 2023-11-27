import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type ReqPersonalItemProps = {
  val: string;
  path: string;
};

export const ReqPersonalItem: FC<ReqPersonalItemProps> = ({ val, path }) => {
  return (
    <div className={styles.bb__req_personal_item}>
      <span className={styles.bb__req_personal_item_val}>{val}</span>
      <AppLink to={path} theme={AppLinkThemes.CLEAN}>
        Смотреть
      </AppLink>
    </div>
  );
};
