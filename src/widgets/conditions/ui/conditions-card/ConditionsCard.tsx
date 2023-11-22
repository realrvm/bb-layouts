import { FC, memo } from "react";

import styles from "./styles.module.scss";

type ConditionsCardProps = {
  content: string;
};

export const ConditionsCard: FC<ConditionsCardProps> = memo(({ content }) => {
  return <div className={styles.bb__conditions_card}>{content}</div>;
});
