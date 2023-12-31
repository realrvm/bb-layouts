import { FC } from "react";

import styles from "./styles.module.scss";
import { AccountPersonalItem } from "./account-personal-item/AccountPersonalItem";
import { SidebarMobile } from "@/widgets/sidebar";

const personal_items = [
  { id: 1, val: "Паспортные данные", path: "passport" },
  { id: 2, val: "ПТС", path: "pts" },
  { id: 3, val: "Банковская карта", path: "card" },
];

type AccountPersonalProps = Record<string, never>;

export const AccountPersonal: FC<AccountPersonalProps> = () => {
  return (
    <>
      <SidebarMobile />
      <div className={styles.bb__req_personal_wrapper}>
        <h2>Персональные данные</h2>
        <ul className={styles.bb__req_personal_list}>
          {personal_items.map((doc) => {
            const { id, ...other } = doc;

            return (
              <li key={id}>
                <AccountPersonalItem {...other} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
