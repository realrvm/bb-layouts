import { FC, memo, useCallback, useState } from "react";

import styles from "./styles.module.scss";
import { Button, ButtonThemes } from "@/shared/ui/button";

type Terms = "24" | "36" | "48" | "60";

type ListLoanTermsProps = {
  className?: string;
};

const terms: Terms[] = ["24", "36", "48", "60"];

export const ListLoanTerms: FC<ListLoanTermsProps> = memo(() => {
  const [activeTerm, setActiveTerm] = useState<Terms>("24");

  const changeTerms = useCallback((term: Terms) => {
    setActiveTerm(term);
  }, []);

  return (
    <ul className={styles.bb__list_loan}>
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
    </ul>
  );
});
