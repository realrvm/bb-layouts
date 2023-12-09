import { FC, memo } from "react";

import { Container } from "@/widgets/container";
import { Accordion } from "@/features/accordion";

import { faqs } from "../const";

import styles from "./styles.module.scss";

type QuestionsProps = Record<string, never>;

export const Questions: FC<QuestionsProps> = memo(() => {
  return (
    <Container>
      <div className={styles.bb__questions}>
        <h3>Часто задаваемые вопросы</h3>
        <Accordion faqs={faqs} />
      </div>
    </Container>
  );
});
