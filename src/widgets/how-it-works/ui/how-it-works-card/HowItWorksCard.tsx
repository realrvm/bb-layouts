import { FC, memo } from "react";

import styles from "./styles.module.scss";

type Card = {
  id: number;
  title: string;
  text: string;
};

type HowItWorksCardProps = {
  card: Card;
};

export const HowItWorksCard: FC<HowItWorksCardProps> = memo(({ card }) => {
  const { id, title, text } = card;

  return (
    <div className={styles.bb__hit_card}>
      <div className={styles.bb__hit_card_number}>{id}</div>
      <p className={styles.bb__hit_card_title}>{title}</p>
      <p className={styles.bb__hit_card_text}>{text}</p>
    </div>
  );
});
