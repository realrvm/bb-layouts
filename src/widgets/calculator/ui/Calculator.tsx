import { FC } from "react";

import { CalculatorForm } from "./calculator-form/CalculatorForm";
import { CalculatorFooter } from "./calculator-footer/CalculatorFooter";
import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";
import { NOTEBOOK_WIDTH, DESKTOP_WIDTH } from "@/shared/lib/const";

import styles from "./styles.module.scss";

type CalculatorProps = Record<string, never>;

export const Calculator: FC<CalculatorProps> = () => {
  const { width } = useWindowWidth();

  return (
    <section className={styles.bb__calc}>
      <div className={styles.bb__calc_wrap}>
        <div className={styles.bb__calc_content}>
          <div className={styles.bb__calc_intro}>
            <h1>Займы под залог ПТС</h1>
            <p>
              Выдаём деньги онлайн, на любые цели:
              <br />
              быстро, без комиссий и страховок
            </p>
            {width > DESKTOP_WIDTH ? <CalculatorFooter /> : null}
          </div>
          {width > NOTEBOOK_WIDTH ? (
            <div className={styles.bb__calc_form}>
              <CalculatorForm />
            </div>
          ) : null}
        </div>
        {width < NOTEBOOK_WIDTH ? (
          <div className={styles.bb__calc_form}>
            <CalculatorForm />
          </div>
        ) : null}
        {width < DESKTOP_WIDTH ? (
          <div className={styles.bb__calc_bottom}>
            <CalculatorFooter className={styles.bb__calc_bottom_content} />
          </div>
        ) : null}
      </div>
    </section>
  );
};
