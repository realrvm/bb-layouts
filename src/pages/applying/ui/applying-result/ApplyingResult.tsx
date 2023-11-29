import { FC } from "react";

import styles from "./styles.module.scss";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type ApplyingResultProps = {
  className?: string;
};

export const ApplyingResult: FC<ApplyingResultProps> = () => {
  return (
    <div className={styles.bb__applying_result}>
      <div className={styles.bb__applying_result_icon}></div>
      <h2>Заявка на рассмотрении</h2>
      <p>В течении 20 мин. с вами свяжется наш агент</p>
      <AppLink to="/" theme={AppLinkThemes.PRIMARY}>
        Перейти в личный кабинет
      </AppLink>
    </div>
  );
};
