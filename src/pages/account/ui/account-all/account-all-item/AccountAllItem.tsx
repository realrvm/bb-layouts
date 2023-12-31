import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink } from "@/shared/ui/app-link";
import { cn } from "@/shared/lib/cn";
import { colorRequests } from "@/shared/lib/helpers/colorRequests";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { DESKTOP_WIDTH } from "@/shared/lib/const";

type AccountAllItemProps = {
  date: string;
  req: string;
  res: string;
};

export const AccountAllItem: FC<AccountAllItemProps> = ({ date, req, res }) => {
  const color = colorRequests(res);
  const { width } = useWindowWidth();

  return (
    <div className={styles.bb__req_all_item}>
      <AppLink to="1">
        {width > DESKTOP_WIDTH ? (
          <>
            <span
              className={cn(styles.bb__req_all_item_res, {}, [styles[color]])}
            >
              {res}
            </span>
            <span className={styles.bb__req_all_item_req}>{req}</span>
            <span className={styles.bb__req_all_item_date}>{date}</span>
            <div className={styles.bb__req_all_item_more}>Подробнее</div>
          </>
        ) : (
          <>
            <div className={styles.bb__req_all_item_mobile}>
              <div className={styles.bb__req_all_item_mobile_row}>
                <span className={styles.bb__req_all_item_req}>{req}</span>
                <span className={styles.bb__req_all_item_date}>{date}</span>
              </div>
              <div className={styles.bb__req_all_item_mobile_row}>
                <span
                  className={cn(styles.bb__req_all_item_res, {}, [
                    styles[color],
                  ])}
                >
                  {res}
                </span>
                <div className={styles.bb__req_all_item_more}>Подробнее</div>
              </div>
            </div>
          </>
        )}
      </AppLink>
    </div>
  );
};
