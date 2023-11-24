import { FC, memo } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type CalculatorFooterProps = {
  className?: string;
};

export const CalculatorFooter: FC<CalculatorFooterProps> = memo(
  ({ className }) => {
    return (
      <div className={cn(styles.bb__calc_intro_footer, {}, [className])}>
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
    );
  },
);
