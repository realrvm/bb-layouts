import { FC, useRef, useState } from "react";

import { Container } from "@/widgets/container";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { ConditionsCard } from "./conditions-card/ConditionsCard";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import styles from "./styles.module.scss";

type ConditionsProps = Record<string, never>;

type CardsValue = "borrower" | "auto" | "docs" | "loan";

const borrower = [
  { content: "Собственник автомобиля", id: 1 },
  { content: "Возраст от 18 до 55 лет", id: 2 },
  { content: "С любой кредитной историей", id: 3 },
];

const auto = [
  { content: "Машина в исправном состоянии", id: 1 },
  { content: "Не имеет ограничений", id: 2 },
  { content: "Старше 2000г.", id: 3 },
];

const docs = [
  { content: "Паспорт", id: 1 },
  { content: "ПТС", id: 2 },
  { content: "Банковская карта", id: 3 },
];

const loan = [
  { content: "Месячный процент 7.9%", id: 1 },
  { content: "Просрочка 1 день + 0.3%", id: 2 },
  { content: "С официальным внесением в реестр нотариальной палаты", id: 3 },
];

const cards = { borrower, auto, docs, loan };

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
              <Button
                onClick={() => setCardsValue("borrower")}
                theme={
                  cardsValue === "borrower"
                    ? ButtonThemes.WO_HOVER
                    : ButtonThemes.CLEAN
                }
              >
                Для заемщика
              </Button>
              <Button
                onClick={() => setCardsValue("auto")}
                theme={
                  cardsValue === "auto"
                    ? ButtonThemes.WO_HOVER
                    : ButtonThemes.CLEAN
                }
              >
                Для автомобиля
              </Button>
              <Button
                onClick={() => setCardsValue("docs")}
                theme={
                  cardsValue === "docs"
                    ? ButtonThemes.WO_HOVER
                    : ButtonThemes.CLEAN
                }
              >
                Какие документы потребуются
              </Button>
              <Button
                onClick={() => setCardsValue("loan")}
                theme={
                  cardsValue === "loan"
                    ? ButtonThemes.WO_HOVER
                    : ButtonThemes.CLEAN
                }
              >
                Условия по займу
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.bb__conditions_cards}>
          {cards[cardsValue].map((card) => {
            const { id, content } = card;
            return <ConditionsCard key={id} content={content} />;
          })}
        </div>
      </Container>
    </section>
  );
};
