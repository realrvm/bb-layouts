import { FC, useRef } from "react";

import styles from "./styles.module.scss";

import chevron_down from "@/shared/assets/icons/chevron-down.svg";
import chevron_up from "@/shared/assets/icons/chevron-up.svg";
import { AppImage } from "@/shared/ui/app-image";

type Faq = {
  id: number;
  answer: string;
  question: string;
};

type AccordionItemProps = {
  faq: Faq;
  active: boolean;
  onToggle: () => void;
};

export const AccordionItem: FC<AccordionItemProps> = ({
  faq,
  onToggle,
  active,
}) => {
  const { answer, question } = faq;

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <li className={styles.bb__accordion_item} onClick={onToggle}>
      <div className={styles.bb__accordion_item_question}>
        <span className={styles.bb__accordion_item_title}>{question}</span>
        {active ? (
          <span>
            <AppImage src={chevron_down} />
          </span>
        ) : (
          <span>
            <AppImage src={chevron_up} />
          </span>
        )}
      </div>
      <div
        className={styles.bb__accordion_item_answer_wrap}
        ref={ref}
        style={
          active ? { height: ref.current?.scrollHeight } : { height: "0px" }
        }
      >
        <div className={styles.bb__accordion_item_answer}>{answer}</div>
      </div>
    </li>
  );
};
