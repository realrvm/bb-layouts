import { FC } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

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
      <span className={styles.bb__req_personal_item_val}>{val}</span>
      <AppLink to={path} theme={AppLinkThemes.CLEAN}>
        Смотреть
      </AppLink>
    </div>
  );
};
