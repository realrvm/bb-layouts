import { FC, useRef } from "react";

import { Container, ContainerRight } from "@/widgets/container";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { ConditionsCard } from "./conditions-card/ConditionsCard";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import styles from "./styles.module.scss";

type ConditionsProps = Record<string, never>;

const conditions_card = [
  { content: "Собственник автомобиля", id: 1 },
  { content: "Возраст от 18 до 55 лет", id: 2 },
  { content: "С любой кредитной историей", id: 3 },
];

export const Conditions: FC<ConditionsProps> = () => {
  const refConditions = useRef<HTMLDivElement | null>(null);
  useSwipe(refConditions);

  return (
    <section className={styles.bb__conditions}>
      <h2>Условия</h2>
      <ContainerRight>
        <div className={styles.bb__conditions_btns_wrap}>
          <div className={styles.bb__conditions_btns} ref={refConditions}>
            <Button onClick={() => console.log("1")}>Для заемщика</Button>
            <Button onClick={() => console.log("2")} theme={ButtonThemes.CLEAN}>
              Для автомобиля
            </Button>
            <Button onClick={() => console.log("3")} theme={ButtonThemes.CLEAN}>
              Какие документы потребуются
            </Button>
            <Button onClick={() => console.log("4")} theme={ButtonThemes.CLEAN}>
              Условия по займу
            </Button>
          </div>
        </div>
      </ContainerRight>
      <Container>
        <div className={styles.bb__conditions_cards}>
          {conditions_card.map((card) => {
            const { id, content } = card;
            return <ConditionsCard key={id} content={content} />;
          })}
        </div>
      </Container>
    </section>
  );
};
