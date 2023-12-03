import { FC, useEffect, useState } from "react";

import { OtpForm } from "./otp-form/OtpForm";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

type OtpProps = {
  value: string;
  onChange: (value: string) => void;
  requestToServer: () => void;
  valueLength?: number;
};

export const Otp: FC<OtpProps> = ({
  onChange,
  value,
  requestToServer,
  valueLength = 4,
}) => {
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prev  => prev - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className={styles.bb__otp_wrapper}>
      <OtpForm value={value} onChange={onChange} valueLength={valueLength} />
      {seconds > 0 ? (
        <p>Запросить код повторно можно через {seconds} сек</p>
      ) : (
        <Button onClick={requestToServer} theme={ButtonThemes.CLEAN}>
          Выслать код повторно
        </Button>
      )}
      <p>
        Ошиблись при вводе номера?
        <Button theme={ButtonThemes.CLEAN} onClick={() => navigate(-1)}>
          Изменить
        </Button>
      </p>
    </div>
  );
};
