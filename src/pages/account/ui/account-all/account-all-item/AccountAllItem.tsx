import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink } from "@/shared/ui/app-link";
import { cn } from "@/shared/lib/cn";
import { colorRequests } from "@/shared/lib/helpers/colorRequests";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { TABLET_WIDTH } from "@/shared/lib/const";

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
        {width > TABLET_WIDTH ? (
          <>
            <div>
              <span className={styles.bb__req_all_item_date}>{date}</span>
              <span className={styles.bb__req_all_item_req}>{req}</span>
            </div>
            <span
              className={cn(styles.bb__req_all_item_res, {}, [styles[color]])}
            >
              {res}
            </span>
          </>
        ) : (
          <>
            <div className={styles.bb__req_all_item_mobile}>
              <span className={styles.bb__req_all_item_req}>{req}</span>
              <span
                className={cn(styles.bb__req_all_item_res, {}, [styles[color]])}
              >
                {res}
              </span>
            </div>
            <span className={styles.bb__req_all_item_date}>{date}</span>
          </>
        )}
      </AppLink>
    </div>
  );
};
