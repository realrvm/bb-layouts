import { FC, memo, useRef } from "react";

import { HowItWorksCard } from "./how-it-works-card/HowItWorksCard";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";

import { hit_cards } from "../const";

import styles from "./styles.module.scss";

type HowItWorksProps = Record<string, never>;

type HitCardsListProps = Record<string, never>;

const HitCardsList: FC<HitCardsListProps> = memo(() => {
  return (
    <>
      {hit_cards.map((card) => {
        const { id } = card;
        return <HowItWorksCard key={id} card={card} />;
      })}
    </>
  );
});

export const HowItWorks: FC<HowItWorksProps> = () => {
  const refHit = useRef<HTMLDivElement | null>(null);
  useSwipe(refHit);

  return (
    <section className={styles.bb__hit}>
      <h2>Как это работает</h2>
      <div className={styles.bb__hit_cards_wrap} ref={refHit}>
        <div className={styles.bb__hit_cards_inner}>
          <div className={styles.bb__hit_cards}>
            <HitCardsList />
          </div>
        </div>
      </div>
    </section>
  );
};
