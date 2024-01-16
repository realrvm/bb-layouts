import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OtpForm } from "./otp-form/OtpForm";
import { Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type OtpProps = {
  value: string;
  onChange: (value: string) => void;
  requestToServer: () => void;
  valueLength?: number;
};

type OtpFinalCountdownProps = {
  requestToServer: () => void;
};

export const Otp: FC<OtpProps> = ({
  onChange,
  value,
  requestToServer,
  valueLength = 6,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.bb__otp_wrapper}>
      <div className={styles.bb__otp_inner}>
        <OtpForm value={value} onChange={onChange} valueLength={valueLength} />
      </div>
      <OtpFinalCountdown requestToServer={requestToServer} />
      <p>
        Ошиблись при вводе номера?
        <Button theme={ButtonThemes.CLEAN} onClick={() => navigate(-1)}>
          Изменить
        </Button>
      </p>
    </div>
  );
};

const OtpFinalCountdown: FC<OtpFinalCountdownProps> = memo(
  ({ requestToServer }) => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
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
      <>
        {seconds > 0 ? (
          <p>Запросить код повторно можно через {seconds} сек</p>
        ) : (
          <Button onClick={requestToServer} theme={ButtonThemes.CLEAN}>
            Выслать код повторно
          </Button>
        )}
      </>
    );
  },
);
