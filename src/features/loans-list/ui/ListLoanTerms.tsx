import { FC, memo, useCallback, useState } from "react";

import { Button, ButtonThemes } from "@/shared/ui/button";
import { terms } from "../const";

import type { Terms } from "../types";

import styles from "./styles.module.scss";

type ListLoanTermsProps = {
  className?: string;
};

type ListLoanButtonsProps = {
  activeTerm: Terms;
  changeTerms: (term: Terms) => void;
};

const ListLoanButtons: FC<ListLoanButtonsProps> = memo(
  ({ activeTerm, changeTerms }) => {
    return (
      <>
        {terms.map((term) => (
          <li key={term}>
            <Button
              theme={
                activeTerm === term ? ButtonThemes.WO_HOVER : ButtonThemes.CLEAN
              }
              onClick={() => changeTerms(term)}
            >
              {term}
            </Button>
          </li>
        ))}
      </>
    );
  },
);

export const ListLoanTerms: FC<ListLoanTermsProps> = memo(() => {
  const [activeTerm, setActiveTerm] = useState<Terms>(terms[0]);

  const changeTerms = useCallback((term: Terms) => {
    setActiveTerm(term);
  }, []);

  return (
    <ul className={styles.bb__list_loan}>
      <ListLoanButtons activeTerm={activeTerm} changeTerms={changeTerms} />
    </ul>
  );
});
