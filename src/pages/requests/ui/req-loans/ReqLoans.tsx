import { FC } from "react";

import styles from "./styles.module.scss";
import { ReqLoansItem } from "./req-loans-item/ReqLoansItem";

type ReqLoansProps = Record<string, never>;

const items = [
  {
    id: 1,
    date: "11.03.2023",
    req: "50 000",
    refund: "9039",
    date_refund: "13.05.2023",
  },
  {
    id: 2,
    date: "11.07.2023",
    req: "15 000",
    refund: "9039",
    date_refund: "13.05.2023",
  },
];

export const ReqLoans: FC<ReqLoansProps> = () => {
  return (
    <div className={styles.bb__req_loans_wrapper}>
      <h2>Активные займы</h2>
      <ul className={styles.bb__req_loans_list}>
        {items.map((item) => {
          const { id, ...other } = item;

          return (
            <li key={id}>
              <ReqLoansItem {...other} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
