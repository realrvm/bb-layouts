import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type GetMoneyFormProps = Record<string, never>;

export const GetMoneyForm: FC<GetMoneyFormProps> = () => {
  const navigate = useNavigate();

  const navigateToNextStep = useCallback(() => {
    navigate("/get_money/gm_check_out/");
  }, []);

  return (
    <section className={styles.bb__gm_container}>
      <div className={styles.bb__gm_icon}></div>
      <h2 className={styles.bb__gm_title}>Получить деньги</h2>
      <p className={styles.bb__gm_text}>
        Введите номер телефона. На него вы получите СМС с кодом или звонок —
        сбросьте его и введите последние 4 цифры номера
      </p>
      <form className={styles.bb__gm_form}>
        <label htmlFor="phone">Номер телефона</label>
        <input
          id="phone"
          type="tel"
          pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
          title="Введите номер телефона в формате +7 XXX XXX XX XX"
        />

        <div className={styles.bb__gm_checkbox}>
          <Checkbox />
          <p>
            Я даю <AppLink to="*">согласие</AppLink> на обработку своих
            персональных данных в соответствии с Федеральным законом «О
            персональных данных» от 27.07.2006 N 152-ФЗ
          </p>
        </div>
        <Button type="submit" onClick={navigateToNextStep}>
          Получить код из СМС
        </Button>
      </form>
    </section>
  );
};
