import { FC } from "react";

import { AccountAllItem } from "./account-all-item/AccountAllItem";

import styles from "./styles.module.scss";
import { SidebarMobile } from "@/widgets/sidebar";

type AccountAllProps = Record<string, never>;

const items = [
  { id: 1, date: "11.03.2023", req: "Займ на сумму 50 000 ₽", res: "Одобрена" },
  {
    id: 2,
    date: "11.07.2023",
    req: "Займ на сумму 15 000 ₽",
    res: "Рассматривается",
  },
  {
    id: 3,
    date: "11.03.2023",
    req: "Займ на сумму 50 000 ₽",
    res: "Не завершена",
  },
  {
    id: 4,
    date: "11.03.2023",
    req: "Займ на сумму 12 000 ₽",
    res: "Не одобрена",
  },
];

export const AccountAll: FC<AccountAllProps> = () => {
  return (
    <>
      <SidebarMobile />
      <div className={styles.bb__req_all_wrapper}>
        <h2>Заявки</h2>
        <ul className={styles.bb__req_all_list}>
          {items.map((item) => {
            const { id, ...other } = item;

            return (
              <li key={id}>
                <AccountAllItem {...other} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
