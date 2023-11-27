import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/Button";
import { ButtonThemes } from "../types";

type BackButtonProps = Record<string, never>;

export const BackButton: FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} theme={ButtonThemes.BACK}>
      <span></span>
      Назад
    </Button>
  );
};
