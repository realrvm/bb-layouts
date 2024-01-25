import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useActionCreators } from "@/app/providers/rtk-provider";
import { targetPathActions } from "@/entities/user";
import { Paths } from "@/shared/lib/types";
import { useGetLoans } from "@/pages/applying";

export const useHandleApplying = () => {
  const navigate = useNavigate();
  const [getLoans, { isFetching: isLoansFetching }] = useGetLoans();
  const actionTargetPath = useActionCreators(targetPathActions);

  const handleApplyingClick = useCallback(
    async (targetPath: Paths) => {
      try {
        const loans = await getLoans().unwrap();

        actionTargetPath.setTargetPath({ targetPath });
        navigate(targetPath);
        console.log(loans);
      } catch (e) {
        actionTargetPath.setTargetPath({ targetPath });

        navigate("/reg/reg_form");
      }
    },
    [getLoans, navigate, actionTargetPath],
  );

  return { handleApplyingClick, isLoansFetching };
};
