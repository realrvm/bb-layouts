import { useCallback, useState } from "react";
import { OTP_LENGTH } from "../constants";
import { useActionCreators, useStateSelector } from "@/app/providers/rtk";
import { getPhoneNumber } from "@/entities/phone";
import { authActions } from "@/features/auth";
import { useNavigate } from "react-router-dom";
import { useObtainApi } from "@/pages/auth";
import { getTargetPage } from "@/entities/target-page";

export function useOTP() {
  const [otp, setOtp] = useState("");
  const [isResendable, setIsResendable] = useState(true);

  const [obtain] = useObtainApi({ fixedCacheKey: "shared-obtain-post" });
  const navigate = useNavigate();

  const authAction = useActionCreators(authActions);

  const phone = useStateSelector(getPhoneNumber);
  const targetPage = useStateSelector(getTargetPage);

  const sendAuthDataToServer = useCallback(async () => {
    try {
      const { access, refresh } = await obtain({
        phone_number: phone,
        password: otp,
      }).unwrap();

      authAction.setAccessToken({ access, refresh });
      if (targetPage) navigate(`/${targetPage}`);
    } catch (e) {
      setOtp("");
    }
  }, [otp, phone, targetPage, navigate, obtain, authAction]);

  if (otp.length === OTP_LENGTH && isResendable) {
    sendAuthDataToServer();
    setIsResendable(false);
  }

  return { otp, setOtp, setIsResendable, phone };
}
