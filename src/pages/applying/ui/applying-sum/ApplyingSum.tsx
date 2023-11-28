import { FC } from "react";

import styles from "./styles.module.scss";
import { ApplyingTitle } from "../applying-title/ApplyingTitle";
import { RangeInput } from "@/features/range-input";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type ApplyingSumProps = Record<string, never>;

export const ApplyingSum: FC<ApplyingSumProps> = () => {
  return (
    <div className={styles.bb__applying_wrapper}>
      <ApplyingTitle index={"one"} />
      <div className={styles.bb__applying_inner}>
        <h4>Введите сумму займа</h4>
        <form className={styles.bb__applying_sum_form}>
          <div className={styles.bb__applying_sum_range}>
            <p>Сумма кредита</p>
            <div className={styles.bb__applying_sum_result}>
              <span>50 000</span>
              <span>₽</span>
            </div>
            <div className={styles.bb__applying_sum_result_wrap}>
              <RangeInput />
            </div>
          </div>
          <div className={styles.bb__applying_sum_range}>
            <p>Срок</p>
            <div className={styles.bb__applying_sum_result}>
              <span>6</span>
              <span>мес</span>
            </div>
            <div className={styles.bb__applying_sum_result_wrap}>
              <RangeInput />
            </div>
          </div>
        </form>
        <div className={styles.bb__applying_sum_binds}>
          <div className={styles.bb__applying_sum_bind}>
            <div>
              Обязательный платёж
              <div
                className={styles.bb__applying_sum_bind_icon}
                data-title="Сумма которая включает в себя оплату только процентов по займу."
              ></div>
            </div>
            <span>11 062 ₽</span>
          </div>
          <div className={styles.bb__applying_sum_bind}>
            <div>
              Рекомендуемый платёж
              <div
                className={styles.bb__applying_sum_bind_icon}
                data-title="В рекомендуемом платежи указана сумма процентов и сумма  с основного долго для погашения займа в указный срок."
              ></div>
            </div>
            <span>22 124 ₽</span>
          </div>
        </div>
      </div>
      <div className={styles.bb__applying_sum_line}></div>
      <div className={styles.bb__applying_sum_btn}>
        <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
          Продолжить
        </AppLink>
      </div>
    </div>
  );
};
