import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { calcLoanCredit } from "@/shared/lib/helpers/calcLoanCredit";
import { usePostLoan } from "@/pages/applying";

export const useLoanApplication = () => {
  const navigate = useNavigate();

  const [postLoan, { isLoading }] = usePostLoan();

  const handlePostLoan = useCallback(
    async (range: number, terms: string) => {
      try {
        const sum = calcLoanCredit(range).replace(/\D/g, "");

        const response = await postLoan({
          borrower: 5,
          sum,
          term: Number(terms),
        }).unwrap();

        navigate("/applying/applying_auto");

        console.log(response);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);

        navigate("/reg/reg_form");
      }
    },
    [postLoan, navigate],
  );

  return { isLoading, handlePostLoan };
};
