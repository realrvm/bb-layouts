import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";

import { RangeInput } from "@/features/range-input";
import { Button } from "@/shared/ui/button";
import { ListLoanTerms } from "@/features/loans-list";
import { calcLoanCredit } from "@/shared/lib/helpers/calcLoanCredit";

import { cn } from "@/shared/lib/cn";

import { calcMonthlyPayment } from "@/shared/lib/helpers/calcMonthlyPayment";
import { useLoanCalculator } from "@/shared/lib/hooks/useLoanCalculator";

import {
  calcPercents,
  getHelpText,
  getProbabilityOfApproval,
  getProbabilityOfApprovalColor,
} from "@/shared/lib/helpers/approval-helpers";

import styles from "./styles.module.scss";

type CalculatorFormProps = Record<string, never>;

type MonthlyPaymentProps = {
  rangeValue: number;
  period: "24" | "36" | "48" | "60";
  rate?: number;
};

type MarketValueOfCarProps = {
  marketPrice: string;
  handleMarketPrice: (e: ChangeEvent<HTMLInputElement>) => void;
};

const MarketValueOfCar: FC<MarketValueOfCarProps> = memo(
  ({ marketPrice, handleMarketPrice }) => {
    return (
      <>
        <p>Рыночная стоимость авто</p>
        <div>
          <input
            type="text"
            value={marketPrice}
            inputMode="numeric"
            onChange={handleMarketPrice}
            maxLength={12}
            placeholder="Рыночная стоимость"
          />
        </div>
        <p>Введите рыночную стоимость авто по вашему мнению</p>
      </>
    );
  },
);

const MonthlyPayment: FC<MonthlyPaymentProps> = memo(
  ({ rangeValue, period, rate }) => {
    return (
      <div className={styles.bb__calc_form_resume_item_l}>
        <span>Ежемесячный платёж</span>
        <span>
          {calcMonthlyPayment(calcLoanCredit(rangeValue), period, rate)} ₽
        </span>
      </div>
    );
  },
);

const ApprovalResult: FC<{ helpText: string }> = memo(({ helpText }) => {
  return (
    <div
      className={cn(styles.bb__calc_form_resume_item_r, {}, [
        getProbabilityOfApprovalColor(helpText, styles),
      ])}
    >
      <span>Вероятность одобрения</span>
      <span>{getProbabilityOfApproval(helpText)}</span>
    </div>
  );
});

export const CalculatorForm: FC<CalculatorFormProps> = memo(() => {
  const [marketPrice, setMarketPrice] = useState("");
  const [rangeValue, setRangeValue] = useState(1);
  const [helpText, setHelpText] = useState("low");

  const { rate, approvalProb, period } = useLoanCalculator();

  const handleMarketPrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const onlyDigits = target.value.replace(/\D/g, "");

    setMarketPrice(onlyDigits);
  }, []);

  useEffect(() => {
    const percents = calcPercents(marketPrice, calcLoanCredit(rangeValue));

    if (approvalProb && Array.isArray(approvalProb)) {
      const text = getHelpText(percents, approvalProb);
      setHelpText(text);
    }
  }, [marketPrice, rangeValue]);

  return (
    <form
      className={styles.bb__calc_form_wrap}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.bb__calc_form_range}>
        <p>Сумма кредита</p>
        <div className={styles.bb__calc_form_result}>
          <span>{calcLoanCredit(rangeValue)}</span>
          <span>₽</span>
        </div>
        <div className={styles.bb__calc_form_result_wrap}>
          <RangeInput setRangeValue={setRangeValue} />
        </div>
      </div>
      <div className={styles.bb__calc_form_range}>
        <p>Срок займа, месяцев</p>
        <div className={styles.bb__calc_form_result_btns}>
          <ListLoanTerms />
        </div>
      </div>
      <div className={styles.bb__calc_form_input}>
        <MarketValueOfCar
          marketPrice={marketPrice}
          handleMarketPrice={handleMarketPrice}
        />
      </div>
      <div className={styles.bb__calc_form_resume}>
        <MonthlyPayment rangeValue={rangeValue} period={period} rate={rate} />
        <ApprovalResult helpText={helpText} />
      </div>
      <Button className={styles.bb__calc_form_submit} onClick={() => {}}>
        Получить деньги
      </Button>
    </form>
  );
});
