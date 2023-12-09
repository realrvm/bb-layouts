import { FC, memo, useCallback, useState } from "react";

import { MAX_ACCORDION_INDEX } from "@/shared/lib/const";
import { AccordionItem } from "./accordion-item/AccordionItem";

import type { AccordionType } from "../types";

import styles from "./styles.module.scss";

type AccordionProps = {
  faqs: AccordionType[];
};

type AccordionItemProps = {
  faqs: AccordionType[];
  clicked: number;
  handleToggle: (id: number) => void;
};

const AccordionFAQs: FC<AccordionItemProps> = memo(
  ({ faqs, clicked, handleToggle }) => {
    return (
      <>
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
      </>
    );
  },
);

export const Accordion: FC<AccordionProps> = memo(({ faqs }) => {
  const [clicked, setClicked] = useState(MAX_ACCORDION_INDEX);

  const handleToggle = useCallback(
    (id: number) => {
      return clicked === id ? setClicked(MAX_ACCORDION_INDEX) : setClicked(id);
    },
    [clicked],
  );

  return (
    <ul className={styles.bb__accordion}>
      <AccordionFAQs
        clicked={clicked}
        handleToggle={handleToggle}
        faqs={faqs}
      />
    </ul>
  );
});
