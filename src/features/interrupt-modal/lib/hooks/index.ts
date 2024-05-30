import { useNavigate } from "react-router-dom";

import { useActionCreators } from "@/app/providers/rtk";
import { loanActions } from "@/entities/loan";

export function useHandleInterruption() {
  const navigate = useNavigate();
  const loanAction = useActionCreators(loanActions);

  const handleInterruption = () => {
    loanAction.setLoan({ appointed_term: "24", appointed_sum: 50000 });

    navigate("/");
  };

  return { handleInterruption };
}
