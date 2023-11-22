import { FC } from "react";

import { Container } from "@/widgets/container";
import { AppImage } from "@/shared/ui/app-image";

import intro_car from "@/shared/assets/images/intro_car.png";

import styles from "./styles.module.scss";

type CalculatorProps = Record<string, never>;

export const Calculator: FC<CalculatorProps> = () => {
  return (
    <section className={styles.bb__calc}>
      <Container>
        <div className={styles.bb__calc_content}>
          <div className={styles.bb__calc_intro}>
            <h1>Займы под залог ПТС</h1>
            <p>
              Выдаём деньги онлайн, на любые цели:
              <br />
              быстро, без комиссий и страховок
            </p>
            <AppImage src={intro_car} alt="intro_car" />
            <div className={styles.bb__calc_intro_footer}>
              <dl>
                <dd>6,9%</dd>
                <dt>Средний процент займа</dt>
              </dl>
              <dl>
                <dd>30 мин.</dd>
                <dt>На проверку заявки</dt>
              </dl>
              <dl>
                <dd>до 70%</dd>
                <dt>От стоимости автомобиля</dt>
              </dl>
            </div>
          </div>
          <div className={styles.bb__calc_form}>
            <p>Форма</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
