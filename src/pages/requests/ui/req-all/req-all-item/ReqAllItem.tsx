import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink } from "@/shared/ui/app-link";

type ReqAllItemProps = {
  date: string;
  req: string;
  res: string;
};

export const ReqAllItem: FC<ReqAllItemProps> = ({ date, req, res }) => {
  return (
    <div className={styles.bb__req_all_item}>
      <AppLink to="*">
        <div>
          <span className={styles.bb__req_all_item_date}>{date}</span>
          <span className={styles.bb__req_all_item_req}>{req}</span>
        </div>
        <span className={styles.bb__req_all_item_res}>{res}</span>
      </AppLink>
    </div>
  );
};
