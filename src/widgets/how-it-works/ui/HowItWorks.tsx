import { FC } from "react";

import styles from "./styles.module.scss";
import { Container } from "@/widgets/container";
import { HowItWorksCard } from "./how-it-works-card/HowItWorksCard";

const hit_cards = [
  {
    id: 1,
    title: "Заполните заявку",
    text: "Онлайн на сайте — обычно это занимает всего несколько минут",
  },
  {
    id: 2,
    title: "Согласуйте время и место с агентом",
    text: "Для проверки документов и подписания договора",
  },
  {
    id: 3,
    title: "Получите деньги на карту",
    text: "Сообщаем результат онлайни в СМС, переводим всю сумму сразу",
  },
  {
    id: 4,
    title: "Платите на сайте",
    text: "Внести платежи можно с карты в личном кабинете без комиссии",
  },
];

type HowItWorksProps = Record<string, never>;

export const HowItWorks: FC<HowItWorksProps> = () => {
  return (
    <Container>
      <section className={styles.bb__hit}>
        <h2>Как это работает</h2>
        <div className={styles.bb__hit_cards}>
          {hit_cards.map((card) => {
            const { id } = card;
            return <HowItWorksCard key={id} card={card} />;
          })}
        </div>
      </section>
    </Container>
  );
};
