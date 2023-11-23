import { FC, memo } from "react";

import styles from "./styles.module.scss";
import { RangeInput } from "@/features/range-input";
import { Button } from "@/shared/ui/button";

type CalculatorFormProps = Record<string, never>;

export const CalculatorForm: FC<CalculatorFormProps> = memo(() => {
  return (
    <form className={styles.bb__calc_form_wrap}>
      <div className={styles.bb__calc_form_range}>
        <p>Сумма кредита</p>
        <div className={styles.bb__calc_form_result}>
          <span>50 000</span>
          <span>₽</span>
        </div>
        <div className={styles.bb__calc_form_result_wrap}>
          <RangeInput />
        </div>
      </div>
      <div className={styles.bb__calc_form_range}>
        <p>Срок</p>
        <div className={styles.bb__calc_form_result}>
          <span>6</span>
          <span>мес</span>
        </div>
        <div className={styles.bb__calc_form_result_wrap}>
          <RangeInput />
        </div>
      </div>
      <div className={styles.bb__calc_form_input}>
        <p>Рыночная стоимость авто</p>
        <div>
          <input type="text" />
        </div>
        <p>Введите рыночную стоимость авто по вашему мнению</p>
      </div>
      <div className={styles.bb__calc_form_resume}>
        <div className={styles.bb__calc_form_resume_item_l}>
          <span>Ежемесячный платёж</span>
          <span>8 535 ₽</span>
        </div>
        <div className={styles.bb__calc_form_resume_item_r}>
          <span>Вероятность одобрения</span>
          <span>Очень высокая</span>
        </div>
      </div>
      <Button className={styles.bb__calc_form_submit} type="submit">
        Получить деньги
      </Button>
    </form>
  );
});
