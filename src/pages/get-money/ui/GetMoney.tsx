import { FC } from "react";

import { NavbarSimple } from "@/widgets/navbar";
import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type GetMoneyProps = Record<string, never>;

export const GetMoney: FC<GetMoneyProps> = () => {
  return (
    <>
      <NavbarSimple className="bb__simple" />
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
            required
          />

          <div className={styles.bb__gm_checkbox}>
            <Checkbox />
            <p>
              Я даю <AppLink to="*">согласие</AppLink> на обработку своих
              персональных данных в соответствии с Федеральным законом «О
              персональных данных» от 27.07.2006 N 152-ФЗ
            </p>
          </div>
          <Button type="submit">
            Получить код из СМС
          </Button>
        </form>
      </section>
    </>
  );
};
