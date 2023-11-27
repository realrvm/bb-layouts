import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink } from "@/shared/ui/app-link";
import { cn } from "@/shared/lib/cn";
import { colorRequests } from "@/shared/lib/helpers/colorRequests";

type ReqAllItemProps = {
  date: string;
  req: string;
  res: string;
};

export const ReqAllItem: FC<ReqAllItemProps> = ({ date, req, res }) => {
  const color = colorRequests(res);

  return (
    <div className={styles.bb__req_all_item}>
      <AppLink to="*">
        <div>
          <span className={styles.bb__req_all_item_date}>{date}</span>
          <span className={styles.bb__req_all_item_req}>{req}</span>
        </div>
        <span className={cn(styles.bb__req_all_item_res, {}, [styles[color]])}>
          {res}
        </span>
      </AppLink>
    </div>
  );
};
