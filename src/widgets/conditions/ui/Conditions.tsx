import { FC, memo, useRef, useState } from "react";

import { Container } from "@/widgets/container";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { ConditionsCard } from "./conditions-card/ConditionsCard";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import { cards, conditional_btns } from "../const";

import type { CardsValue } from "../types";

import styles from "./styles.module.scss";

type ConditionsProps = Record<string, never>;

type ConditionalButtonsProps = {
  cardsValue: CardsValue;
  setCardsValue: (key: CardsValue) => void;
};

type ChangeCardContentProps = {
  cardsValue: CardsValue;
};

const ConditionalButtons: FC<ConditionalButtonsProps> = memo(
  ({ cardsValue, setCardsValue }) => {
    return (
      <>
        {conditional_btns.map((btn) => {
          const [key, value] = Object.entries(btn)[0] as [CardsValue, string];
          return (
            <Button
              onClick={() => setCardsValue(key)}
              key={key}
              theme={
                key === cardsValue ? ButtonThemes.WO_HOVER : ButtonThemes.CLEAN
              }
            >
              {value}
            </Button>
          );
        })}
      </>
    );
  },
);

const ChangeCardContent: FC<ChangeCardContentProps> = memo(({ cardsValue }) => {
  return (
    <>
      {cards[cardsValue].map((card) => {
        const { id, content } = card;
        return <ConditionsCard key={id} content={content} />;
      })}
    </>
  );
});

export const Conditions: FC<ConditionsProps> = () => {
  const [cardsValue, setCardsValue] = useState<CardsValue>("borrower");

  const refConditions = useRef<HTMLDivElement | null>(null);
  useSwipe(refConditions);

  return (
    <section className={styles.bb__conditions}>
      <h2>Условия</h2>
      <div className={styles.bb__conditions_btns_wrap}>
        <div className={styles.bb__conditions_btns_inner} ref={refConditions}>
          <div className={styles.bb__conditions_btns_box}>
            <div className={styles.bb__conditions_btns}>
              <ConditionalButtons
                cardsValue={cardsValue}
                setCardsValue={setCardsValue}
              />
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.bb__conditions_cards}>
          <ChangeCardContent cardsValue={cardsValue} />
        </div>
      </Container>
    </section>
  );
};
