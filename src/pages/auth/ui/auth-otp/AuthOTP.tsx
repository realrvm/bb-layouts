import { FC, useEffect } from "react";

import { Otp } from "@/widgets/otp";
import { Auth } from "../Auth";
import { useOTP } from "../../lib/hooks";
import { useRegisterApi } from "../../model/api/registerApi";

const AuthOTP: FC = () => {
  const { otp, setOtp, setIsResendable, phone } = useOTP();

  const [, result] = useRegisterApi({
    fixedCacheKey: "shared-register-post",
  });

  useEffect(() => {
    alert(`Код OTP : ${result.data?.otp}`);
  }, [result]);

  return (
    <Auth>
      <h2 className="heading-title md:heading-2 mb-3">Введите код из СМС</h2>
      <p className="mb-12 text-center">
        Мы отправили код подтверждения на номер {phone}
      </p>
      <Otp
        value={otp}
        onChange={(value) => setOtp(value)}
        resendable={setIsResendable}
        phone_number={phone}
      />
    </Auth>
  );
};

export default AuthOTP;
