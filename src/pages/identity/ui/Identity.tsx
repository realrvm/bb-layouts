import { FC } from "react";

import { NavbarSimple } from "@/widgets/navbar";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type IdentityProps = Record<string, never>;

export const Identity: FC<IdentityProps> = () => {
  return (
    <>
      <NavbarSimple className="bb__simple" />
      <section className={styles.bb__ident_container}>
        <div className={styles.bb__ident_icon}></div>
        <h2 className={styles.bb__ident_title}>Войти в личный кабинет</h2>
        <p className={styles.bb__ident_text}>
          Введите номер телефона, на который вы оформили займ.На него вы
          получите СМС с кодом.
        </p>
        <form className={styles.bb__ident_form}>
          <label htmlFor="ident_phone">Номер телефона</label>
          <input
            id="ident_phone"
            type="tel"
            pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
            title="Введите номер телефона в формате +7 XXX XXX XX XX"
            required
          />
          <Button type="submit">Получить код из СМС</Button>
        </form>
      </section>
    </>
  );
};
