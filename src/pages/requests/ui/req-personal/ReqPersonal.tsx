import { FC } from "react";

import styles from "./styles.module.scss";
import { ReqPersonalItem } from "./req-personal-item/ReqPersonalItem";

const personal_items = [
  { id: 1, val: "Паспортные данные" },
  { id: 2, val: "ПТС" },
  { id: 3, val: "Банковская карта" },
];

type ReqPersonalProps = Record<string, never>;

export const ReqPersonal: FC<ReqPersonalProps> = () => {
  return (
    <div className={styles.bb__req_personal_wrapper}>
      <h2>Персональные данные</h2>
      <ul className={styles.bb__req_personal_list}>
        {personal_items.map((doc) => {
          const { id, ...other } = doc;

          return (
            <li key={id}>
              <ReqPersonalItem {...other} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
