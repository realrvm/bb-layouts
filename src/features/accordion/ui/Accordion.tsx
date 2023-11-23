import { FC, useCallback, useState } from "react";

import styles from "./styles.module.scss";
import { AccordionItem } from "./accordion-item/AccordionItem";

type AccordionType = {
  question: string;
  answer: string;
  id: number;
};

type AccordionProps = {
  faqs: AccordionType[];
};

export const Accordion: FC<AccordionProps> = ({ faqs }) => {
  const [clicked, setClicked] = useState(333);

  const handleToggle = useCallback(
    (id: number) => {
      return clicked === id ? setClicked(333) : setClicked(id);
    },
    [clicked],
  );

  return (
    <ul className={styles.bb__accordion}>
      {faqs.map((faq) => {
        const { id } = faq;

        return (
          <AccordionItem
            key={id}
            onToggle={() => handleToggle(id)}
            faq={faq}
            active={clicked === id}
          />
        );
      })}
    </ul>
  );
};
