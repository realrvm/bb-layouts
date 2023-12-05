import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";
import {
  useActionCreators,
  useAppDispatch,
} from "@/app/providers/rtk-provider";
import { phoneActions } from "@/entities/phone";
import { register } from "@/features/serve";

type RegistrationFormProps = Record<string, never>;

export const RegistrationForm: FC<RegistrationFormProps> = () => {
  const [checked, isChecked] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const regDispatch = useAppDispatch();

  const navigate = useNavigate();

  const phoneAction = useActionCreators(phoneActions);

  const navigateToNextStep = useCallback(() => {
    regDispatch(register({ phone_number: phoneValue }));
    navigate("/reg/reg_check_out/");
    phoneAction.setPhone(phoneValue);
  }, [phoneValue, phoneAction, regDispatch, register]);

  const handleCheck = useCallback((state: boolean) => {
    isChecked(state);
  }, []);

  return (
    <section className={styles.bb__gm_container}>
      <div className={styles.bb__gm_icon}></div>
      <h2 className={styles.bb__gm_title}>Получить деньги</h2>
      <p className={styles.bb__gm_text}>
        Введите номер телефона. На него вы получите СМС с кодом или звонок —
        сбросьте его и введите последние 4 цифры номера
      </p>
      <div className={styles.bb__gm_form}>
        <label htmlFor="phone">Номер телефона</label>
        <input
          id="phone"
          type="tel"
          title="Введите номер телефона в формате +7 XXX XXX XX XX"
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          placeholder="+7 XXX XXX XX XX"
        />

        <div className={styles.bb__gm_checkbox}>
          <Checkbox handleCheck={handleCheck} checked={checked} />
          <p>
            Я даю <AppLink to="*">согласие</AppLink> на обработку своих
            персональных данных в соответствии с Федеральным законом «О
            персональных данных» от 27.07.2006 N 152-ФЗ
          </p>
        </div>
        <Button onClick={navigateToNextStep} disabled={!checked}>
          Получить код из СМС
        </Button>
      </div>
    </section>
  );
};
