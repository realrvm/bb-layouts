import { FC, useRef } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import styles from "./styles.module.scss";

const loans = [
  {
    id: "1",
    data: "06.08.2023",
    debt: "---",
    percents: "---",
    fine: "2000",
    total: "2000",
    sum: "0",
  },
  {
    id: "2",
    data: "06.09.2023",
    debt: "8 333,3",
    percents: "846,99",
    fine: "---",
    total: "9 180,32",
    sum: "0",
  },
];

type AccountLoansInfoProps = {
  className?: string;
};

export const AccountLoansInfo: FC<AccountLoansInfoProps> = () => {
  const refTable = useRef<HTMLTableElement | null>(null);
  useSwipe(refTable);

  return (
    <div className={styles.bb__req_loans_info_wrapper}>
      <div className={styles.bb__req_loans_info_title}>
        <BackButton />
        <h2>
          Займ на сумму <span style={{ whiteSpace: "nowrap" }}>20 000 ₽</span>
        </h2>
      </div>
      <div className={styles.bb__req_loans_info_inner}>
        <h3>Договор займа №00435 от 06.08.2023</h3>
        <div className={styles.bb__req_loans_info_table_wrap} ref={refTable}>
          <table className={styles.bb__req_loans_info_table}>
            <thead>
              <tr>
                <th>Дата платежа</th>
                <th>Основной долг</th>
                <th>Проценты</th>
                <th>Комиссии, штрафы, пени</th>
                <th>Итого</th>
                <th>Сумма к оплате</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const { id, data, debt, percents, fine, total, sum } = loan;

                return (
                  <tr key={id}>
                    <td>{data}</td>
                    <td>{debt}</td>
                    <td>{percents}</td>
                    <td>{fine}</td>
                    <td>{total}</td>
                    <td>{sum}</td>
                  </tr>
                );
              })}
              <tr>
                <td>Итого:</td>
                <td>24 999,99</td>
                <td>22 79,14</td>
                <td>2000</td>
                <td>22 79,14</td>
                <td>18 098,81</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.bb__req_loans_info_inner_btns}>
          <Button
            onClick={() => console.log("погасить  досрочно")}
            theme={ButtonThemes.OUTLINE}
          >
            Погасить досрочно
          </Button>
          <Button
            onClick={() => console.log("досрочно")}
            theme={ButtonThemes.PRIMARY}
          >
            Погасить
          </Button>
        </div>
      </div>
      <div className={styles.bb__req_loans_info_inner_btns_mobile}>
        <Button
          onClick={() => console.log("погасить  досрочно")}
          theme={ButtonThemes.OUTLINE}
        >
          Погасить досрочно
        </Button>
        <Button
          onClick={() => console.log("досрочно")}
          theme={ButtonThemes.PRIMARY}
        >
          Погасить
        </Button>
      </div>
    </div>
  );
};
