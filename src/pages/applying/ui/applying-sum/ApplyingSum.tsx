import { FC } from "react";

import { RangeInput } from "@/features/range-input";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";

import styles from "./styles.module.scss";
import { ListLoanTerms } from "@/features/loans-list";

type ApplyingSumProps = Record<string, never>;

export const ApplyingSum: FC<ApplyingSumProps> = () => {
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
              <span>50 000</span>
              <span>₽</span>
            </div>
            <div className={styles.bb__applying_sum_result_wrap}>
              <RangeInput />
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
            <div>
              Обязательный платёж
              <div className={styles.bb__applying_sum_bind_left}>
                <span className={styles.bb__applying_sum_bind_icon}></span>
              </div>
            </div>
            <span>11 062 ₽</span>
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
      <div className={styles.bb__applying_sum_btn}>
        <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
          Продолжить
        </AppLink>
      </div>
    </div>
  );
};
