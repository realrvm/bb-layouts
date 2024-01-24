import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { calcLoanCredit } from "@/shared/lib/helpers/calcLoanCredit";
import { usePostLoan } from "@/pages/applying";
import { useActionCreators } from "@/app/providers/rtk-provider";
import { loanRequestActions, targetPathActions } from "@/entities/user";

import { Months, Paths } from "@/shared/lib/types";

export const useLoanApplication = () => {
  const navigate = useNavigate();
  const actionTargetPath = useActionCreators(targetPathActions);
  const actionLoanRequest = useActionCreators(loanRequestActions);

  const [postLoan, { isLoading }] = usePostLoan();

  const handlePostLoan = useCallback(
    async (range: number, term: Months) => {
      const sum = calcLoanCredit(range).replace(/\D/g, "");
      try {
        const response = await postLoan({
          sum,
          term: Number(term),
        }).unwrap();

        navigate("/applying/applying_auto");

        console.log(response);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
        actionTargetPath.setTargetPath({ targetPath: Paths.APPLYING });
        actionLoanRequest.setLoanRequestSum({ sum });
        actionLoanRequest.setLoanRequestTerm({ term });

        navigate("/reg/reg_form");
      }
    },
    [postLoan, navigate],
  );

  return { isLoading, handlePostLoan };
};
