import { FC } from "react";

import styles from "./styles.module.scss";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

type ApplyingBackBtnProps = Record<string, never>;

export const ApplyingBackBtn: FC<ApplyingBackBtnProps> = () => {
  const navigate = useNavigate();

  return (
    <Button
      theme={ButtonThemes.OUTLINE}
      onClick={() => navigate(-1)}
      className={styles.bb__applying_back_btn}
    >
      Назад
    </Button>
  );
};
