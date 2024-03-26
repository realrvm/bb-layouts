import { FC, memo, useCallback, useState } from "react";

import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Funding } from "@/shared/ui/icons";
import { InputMask } from "@/shared/ui/input-mask";
import { useRegister } from "../../lib/hooks";
import { Loader } from "@/shared/ui/loader";
import { Auth } from "../Auth";
import { LOCAL_STORAGE_SITE_HAS_VISITED } from "@/shared/lib/constants";
import { useLocaleStorage } from "@/shared/lib/hooks/useLocalStorage";

const AuthLApplication: FC = () => {
  const [checked, isChecked] = useState(false);
  const { state: hasVisitedToken } = useLocaleStorage(
    LOCAL_STORAGE_SITE_HAS_VISITED,
  );
  const {
    setPhoneValue,
    isLoadingRegistration,
    handleSubmit,
    error,
    isPhoneReady,
  } = useRegister();

  const handleCheck = useCallback((state: boolean) => {
    isChecked(state);
  }, []);

  return (
    <Auth>
      <div className="w-12 h-12 shrink-0 rounded-full bg-icon-bg mb-6 grid place-items-center">
        <Funding />
      </div>
      <h2 className="heading-title md:heading-2 mb-3">Получить деньги</h2>
      <p className="mb-6 md:mb-12 text-center">
        Введите номер телефона. На него вы получите СМС с кодом или звонок —
        сбросьте его и введите последние 4 цифры номера.
      </p>
      <form
        className="flex flex-col w-full max-w-full md:max-w-[408px] h-full md:h-auto"
        onSubmit={handleSubmit}
      >
        {isLoadingRegistration ? (
          <Loader className="min-w-[300px] flex justify-center mb-[50px]" />
        ) : (
          <>
            <label className="mb-6">
              <span className="inline-block mb-2">Номер телефона</span>
              <InputMask setCard={setPhoneValue} />
              {error && (
                <span className="text-small text-special-red">{error}</span>
              )}
            </label>
          </>
        )}
        <div className="mt-auto md:mt-0 pb-7">
          {hasVisitedToken || isLoadingRegistration ? null : (
            <AuthApplicationAgreement
              checked={checked}
              handleCheck={handleCheck}
            />
          )}
          <div className="flex justify-center">
            <Button
              className="btn-medium flex-1"
              disabled={
                !(isPhoneReady && (hasVisitedToken || checked)) ||
                isLoadingRegistration
              }
            >
              Получить код из СМС
            </Button>
          </div>
        </div>
      </form>
    </Auth>
  );
};

const AuthApplicationAgreement: FC<{
  checked: boolean;
  handleCheck: (state: boolean) => void;
}> = memo(({ checked, handleCheck }) => {
  return (
    <div className="mb-6 md:mb-12 flex items-baseline">
      <Checkbox handleCheck={handleCheck} checked={checked} label="" />
      <p className="text-small md:text-medium ml-2">
        Я даю{" "}
        <AppLink to="*" className="hover:underline text-common-brand">
          согласие
        </AppLink>{" "}
        на обработку своих персональных данных в соответствии с Федеральным
        законом «О персональных данных» от 27.07.2006 N 152-ФЗ
      </p>
    </div>
  );
});

export default AuthLApplication;
