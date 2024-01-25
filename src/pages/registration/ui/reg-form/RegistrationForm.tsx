import { FC, memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";

import {
  useActionCreators,
  useStateSelector,
} from "@/app/providers/rtk-provider";
import { phoneActions } from "@/entities/phone";
import { InputMask } from "@/shared/ui/input-mask";
import { useLocaleStorage } from "@/shared/lib/hooks/useLocalStorage";
import { LOCAL_STORAGE_SITE_HAS_VISITED } from "@/shared/lib/const";

import { useRegApi } from "../../model/api/regApi";
import { getTargetPath } from "@/entities/user";

import styles from "./styles.module.scss";
import { Paths } from "@/shared/lib/types";

type RegistrationFormProps = Record<string, never>;

type RegistrationFormIconProps = {
  targetPath?: Paths;
};

type RegistrationFormCheckProps = {
  checked: boolean;
  handleCheck: (state: boolean) => void;
};

export const RegistrationForm: FC<RegistrationFormProps> = () => {
  const [checked, isChecked] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [item] = useLocaleStorage(LOCAL_STORAGE_SITE_HAS_VISITED);

  const [register] = useRegApi({ fixedCacheKey: "shared-register-post" });

  const targetPath = useStateSelector(getTargetPath);

  const isValid = (item || checked) && phoneValue.length === 10;

  const navigate = useNavigate();

  const phoneAction = useActionCreators(phoneActions);

  const navigateToNextStep = useCallback(async () => {
    const correctPhone = `+7${phoneValue}`;

    try {
      await register({ phone_number: correctPhone });

      phoneAction.setPhone(correctPhone);

      navigate("/reg/reg_check_out/");
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, [phoneValue, phoneAction, register]);

  const handleCheck = useCallback((state: boolean) => {
    isChecked(state);
  }, []);

  const getCorrectDesctiption = useCallback(() => {
    if (targetPath === Paths.PROFILE) {
      return "Введите номер телефона, на который вы оформили займ.На него вы получите СМС с кодом.";
    }
    return "Введите номер телефона. На него вы получите СМС с кодом или звонок — сбросьте его и введите последние 4 цифры номера";
  }, [targetPath]);

  const getCorrectTitle = useCallback(() => {
    if (targetPath === Paths.PROFILE) {
      return <h2 className={styles.bb__gm_title}>Войти в личный кабинет</h2>;
    }
    return <h2 className={styles.bb__gm_title}>Получить деньги</h2>;
  }, [targetPath]);

  return (
    <section className={styles.bb__gm_container}>
      <RegistrationFormIcon targetPath={targetPath} />
      {getCorrectTitle()}
      <p className={styles.bb__gm_text}>{getCorrectDesctiption()}</p>
      <div className={styles.bb__gm_form}>
        <label htmlFor="phone">Номер телефона</label>
        <InputMask setCard={setPhoneValue} />
        {item ? null : (
          <RegistrationFormCheck handleCheck={handleCheck} checked={checked} />
        )}
        <Button onClick={navigateToNextStep} disabled={!isValid}>
          Получить код из СМС
        </Button>
      </div>
    </section>
  );
};

const RegistrationFormIcon: FC<RegistrationFormIconProps> = ({
  targetPath,
}) => {
  return (
    <div
      className={
        targetPath === Paths.APPLYING_SUM || Paths.APPLYING_AUTO
          ? styles["bb__gm-icon"]
          : styles["bb__gm-icon2"]
      }
    />
  );
};

const RegistrationFormCheck: FC<RegistrationFormCheckProps> = memo(
  ({ checked, handleCheck }) => {
    return (
      <div className={styles.bb__gm_checkbox}>
        <Checkbox handleCheck={handleCheck} checked={checked} />
        <p>
          Я даю <AppLink to="*">согласие</AppLink> на обработку своих
          персональных данных в соответствии с Федеральным законом «О
          персональных данных» от 27.07.2006 N 152-ФЗ
        </p>
      </div>
    );
  },
);
