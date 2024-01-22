import { FC } from "react";

import { Button, ButtonThemes } from "@/shared/ui/button";

import { useHandleProfile } from "@/shared/lib/hooks/useHandleProlile";

import styles from "./styles.module.scss";

type ApplyingResultProps = {
  className?: string;
};

export const ApplyingResult: FC<ApplyingResultProps> = () => {
  const { isProfileFetching, handleProfileClick } = useHandleProfile();

  return (
    <div className={styles.bb__applying_result}>
      <div className={styles.bb__applying_result_icon}></div>
      <h2>Заявка на рассмотрении</h2>
      <p>В течении 20 мин. с вами свяжется наш агент</p>
      <Button
        theme={ButtonThemes.PRIMARY}
        disabled={isProfileFetching}
        onClick={handleProfileClick}
      >
        Перейти в личный кабинет
      </Button>
    </div>
  );
};
