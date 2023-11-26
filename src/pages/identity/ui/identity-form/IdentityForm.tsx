import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type IdentityFormProps = Record<string, never>;

export const IdentityForm: FC<IdentityFormProps> = () => {
  const navigate = useNavigate();

  const navigateToNextStep = useCallback(() => {
    navigate("/identity/identity_check_out/");
  }, []);

  return (
    <section className={styles.bb__ident_container}>
      <div className={styles.bb__ident_icon}></div>
      <h2 className={styles.bb__ident_title}>Войти в личный кабинет</h2>
      <p className={styles.bb__ident_text}>
        Введите номер телефона, на который вы оформили займ.На него вы получите
        СМС с кодом.
      </p>
      <form className={styles.bb__ident_form}>
        <label htmlFor="ident_phone">Номер телефона</label>
        <input
          id="ident_phone"
          type="tel"
          pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
          title="Введите номер телефона в формате +7 XXX XXX XX XX"
        />
        <Button type="submit" onClick={navigateToNextStep}>
          Получить код из СМС
        </Button>
      </form>
    </section>
  );
};
