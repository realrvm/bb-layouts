import { FC, memo, useState } from "react";

import { RangeInput } from "@/features/range-input";
import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";

import { ListLoanTerms } from "@/features/loans-list";
import { calcLoanCredit } from "@/shared/lib/helpers/calcLoanCredit";

import { useLoanCalculator } from "@/shared/lib/hooks/useLoanCalculator";
import { calcMonthlyPayment } from "@/shared/lib/helpers/calcMonthlyPayment";
import { Months } from "@/shared/lib/types";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { useLoanApplication } from "@/shared/lib/hooks/useLoanApplication";

import styles from "./styles.module.scss";

type ApplyingSumProps = Record<string, never>;

type MonthlyPaymentProps = {
  rangeValue: number;
  period: Months;
  rate?: number;
};

type ApplyingButtonProps = {
  rangeValue: number;
  period: Months;
};

const MonthlyPayment: FC<MonthlyPaymentProps> = memo(
  ({ rangeValue, period, rate }) => {
    return (
      <>
        <div>
          Обязательный платёж
          <div className={styles.bb__applying_sum_bind_left}>
            <span className={styles.bb__applying_sum_bind_icon}></span>
          </div>
        </div>
        <span>
          {calcMonthlyPayment(calcLoanCredit(rangeValue), period, rate)} ₽
        </span>
      </>
    );
  },
);

const ApplyingButton: FC<ApplyingButtonProps> = memo(
  ({ rangeValue, period }) => {
    const { isLoading, handlePostLoan } = useLoanApplication();

    return (
      <div className={styles.bb__applying_sum_btn}>
        <Button
          disabled={isLoading}
          theme={ButtonThemes.PRIMARY}
          onClick={() => handlePostLoan(rangeValue, period)}
        >
          Продолжить
        </Button>
      </div>
    );
  },
);

const ApplyingSum: FC<ApplyingSumProps> = () => {
  const [rangeValue, setRangeValue] = useState(1);

  const { rate, period } = useLoanCalculator();

  return (
    <div className={styles.bb__applying_wrapper}>
      <ApplyingTitle index={"one"} />
      <div className={styles.bb__applying_inner}>
        <h4>Введите сумму займа</h4>
        <form
          className={styles.bb__applying_sum_form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.bb__applying_sum_range}>
            <p>Сумма кредита</p>
            <div className={styles.bb__applying_sum_result}>
              <span>{calcLoanCredit(rangeValue)}</span>
              <span>₽</span>
            </div>
            <div className={styles.bb__applying_sum_result_wrap}>
              <RangeInput setRangeValue={setRangeValue} />
            </div>
          </div>
          <div className={styles.bb__applying_sum_range}>
            <p>Срок займа, месяцев</p>
            <div className={styles.bb__applying_sum_result_btns}>
              <ListLoanTerms />
            </div>
          </div>
        </form>
        <div className={styles.bb__applying_sum_binds}>
          <div className={styles.bb__applying_sum_bind}>
            <MonthlyPayment
              rangeValue={rangeValue}
              period={period}
              rate={rate}
            />
          </div>
          <div className={styles.bb__applying_sum_bind}>
            <div>
              Рекомендуемый платёж
              <div className={styles.bb__applying_sum_bind_right}>
                <span className={styles.bb__applying_sum_bind_icon}></span>
              </div>
            </div>
            <span>22 124 ₽</span>
          </div>
        </div>
      </div>
      <div className={styles.bb__applying_sum_line}></div>
      <ApplyingButton rangeValue={rangeValue} period={period} />
    </div>
  );
};

export default ApplyingSum;
