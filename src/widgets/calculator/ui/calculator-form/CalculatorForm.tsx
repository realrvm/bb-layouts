import { ChangeEvent, FC, memo, useCallback, useState } from "react";

import { RangeInput } from "@/features/range-input";
import { Button } from "@/shared/ui/button";
import { useStateSelector } from "@/app/providers/rtk-provider";
import { ListLoanTerms } from "@/features/loans-list";
import { calcLoanCredit } from "@/shared/lib/helpers/calcLoanCredit";

import styles from "./styles.module.scss";
import {
  getAnnuityPeriod,
  useGetAnnuityApproval,
  useGetAnnuityRate,
} from "@/entities/annuity";
import { calcMonthlyPayment } from "@/shared/lib/helpers/calcMonthlyPayment";

type CalculatorFormProps = Record<string, never>;

export const CalculatorForm: FC<CalculatorFormProps> = memo(() => {
  const [marketPrice, setMarketPrice] = useState("");
  const [rangeValue, setRangeValue] = useState(1);
  const { data: rate } = useGetAnnuityRate();
  const period = useStateSelector(getAnnuityPeriod);
  const { data } = useGetAnnuityApproval();
  console.log(data);

  const handleMarketPrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const onlyDigits = target.value.replace(/\D/g, "");

    setMarketPrice(onlyDigits);
  }, []);

  if (marketPrice !== "") {
    const num = Number(marketPrice);
    console.log(num);
  }

  const handleRate = () => {};

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
      </div>
      <div className={styles.bb__calc_form_resume}>
        <div className={styles.bb__calc_form_resume_item_l}>
          <span>Ежемесячный платёж</span>
          <span>
            {calcMonthlyPayment(calcLoanCredit(rangeValue), period, rate)} ₽
          </span>
        </div>
        <div className={styles.bb__calc_form_resume_item_r}>
          <span>Вероятность одобрения</span>
          <span>Очень высокая</span>
        </div>
      </div>
      <Button className={styles.bb__calc_form_submit} onClick={handleRate}>
        Получить деньги
      </Button>
    </form>
  );
});
