import { FC, memo, useCallback, useState } from "react";

import { Button, ButtonThemes } from "@/shared/ui/button";
import { terms } from "../const";

import { useActionCreators } from "@/app/providers/rtk-provider";
import { Months } from "@/shared/lib/types";
import { loanRequestActions } from "@/entities/user";

import styles from "./styles.module.scss";

type ListLoanTermsProps = {
  className?: string;
};

type ListLoanButtonsProps = {
  activeTerm: Months;
  changeTerms: (term: Months) => void;
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
  const [activeTerm, setActiveTerm] = useState<Months>(terms[0]);
  const loanTermAction = useActionCreators(loanRequestActions);

  const changeTerms = useCallback((term: Months) => {
    setActiveTerm(term);
    loanTermAction.setLoanRequestTerm({term});
  }, []);

  return (
    <ul className={styles.bb__list_loan}>
      <ListLoanButtons activeTerm={activeTerm} changeTerms={changeTerms} />
    </ul>
  );
});
