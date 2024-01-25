import { FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OtpForm } from "./otp-form/OtpForm";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { useObtainApi, useRegApi } from "@/pages/registration/model/api/regApi";
import { ServerErrors } from "@/shared/lib/types";

import styles from "./styles.module.scss";
import { useStateSelector } from "@/app/providers/rtk-provider";
import { getPhoneNumber } from "@/entities/phone";

type OtpProps = {
  value: string;
  onChange: (value: string) => void;
  valueLength?: number;
};

type OtpFinalCountdownProps = {
  resendOtp: () => void;
  isResending: boolean;
};

export const Otp: FC<OtpProps> = ({ onChange, value, valueLength = 6 }) => {
  const navigate = useNavigate();
  const phone_number = useStateSelector(getPhoneNumber);

  const [
    register,
    {
      isError: isRegisterError,
      error: registerError,
      isLoading: isResendLoading,
    },
  ] = useRegApi({
    fixedCacheKey: "shared-register-post",
  });

  const [, { isError: isObtainError, error: obtainError }] = useObtainApi({
    fixedCacheKey: "shared-obtain-post",
  });

  const getWrongMessage = useCallback(() => {
    if (isRegisterError && registerError) {
      if ("status" in registerError && registerError.status === 500) {
        const errorMessage = "data" in registerError && registerError.data;

        return (errorMessage as { error: string })?.error ===
          ServerErrors.WRONG_PHONE ? (
          <p className={styles.bb__otp_error}>Этот номер не зарегистрирован</p>
        ) : null;
      }
    }
    if (isObtainError && obtainError) {
      if ("status" in obtainError && obtainError.status === 401) {
        const errorMessage = "data" in obtainError && obtainError.data;

        return (errorMessage as { detail: string })?.detail ===
          ServerErrors.WRONG_SMS ? (
          <p className={styles.bb__otp_error}>Неправильно введен код из смс</p>
        ) : null;
      }
    }
  }, [isRegisterError, registerError, styles, isRegisterError, obtainError]);

  const resendOtp = useCallback(async () => {
    try {
      await register({ phone_number });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }, []);

  return (
    <div className={styles.bb__otp_wrapper}>
      <div className={styles.bb__otp_inner}>
        <OtpForm
          value={value}
          onChange={onChange}
          valueLength={valueLength}
          isWrongRegisterData={isRegisterError || isObtainError}
        />
        {getWrongMessage()}
      </div>
      <OtpFinalCountdown resendOtp={resendOtp} isResending={isResendLoading} />
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
  ({ resendOtp, isResending }) => {
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
          <Button
            disabled={isResending}
            onClick={resendOtp}
            theme={ButtonThemes.CLEAN}
          >
            Выслать код повторно
          </Button>
        )}
      </>
    );
  },
);
