import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

import {
  useActionCreators,
  useAppDispatch,
} from "@/app/providers/rtk-provider";
import { phoneActions } from "@/entities/phone";
import { register } from "@/features/serve";
import { InputMask } from "@/shared/ui/input-mask";

import styles from "./styles.module.scss";

type RegistrationFormProps = Record<string, never>;

export const RegistrationForm: FC<RegistrationFormProps> = () => {
  const [checked, isChecked] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const regDispatch = useAppDispatch();

  const navigate = useNavigate();

  const phoneAction = useActionCreators(phoneActions);

  const navigateToNextStep = useCallback(() => {
    const correctPhone = `+7${phoneValue}`;

    regDispatch(register({ phone_number: correctPhone }));

    phoneAction.setPhone(correctPhone);

    navigate("/reg/reg_check_out/");
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
        <InputMask setCard={setPhoneValue} />
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
