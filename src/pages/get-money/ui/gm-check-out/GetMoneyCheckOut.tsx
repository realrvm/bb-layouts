import { FC, useState } from "react";

import { Otp } from "@/features/otp";

import { getPhoneNumber } from "@/entities/phone/model/selectors/getPhoneNumber";
import {
  useActionCreators,
  useAppDispatch,
  useStateSelector,
} from "@/app/providers/rtk-provider";
import { login, regActions } from "@/features/reg";

import { Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";
// import axios from "axios";
// import { API_URL } from "@/shared/lib/const";

type GetMoneyCheckOutProps = Record<string, never>;

export const GetMoneyCheckOut: FC<GetMoneyCheckOutProps> = () => {
  const [otp, setOtp] = useState("");

  const phone = useStateSelector(getPhoneNumber);
  const loginDispatch = useAppDispatch();

  const regAction = useActionCreators(regActions);

  const sendToServer = () => {
    regAction.setPhoneNumber(phone);
    regAction.setOtpPassword(otp);
    loginDispatch(login({ phone_number: phone, password: otp }));
    // TODO
    // const res = await axios.post(`${API_URL}/token/obtain/`, {
    //   phone_number: phone,
    //   password: otp,
    // });
    // console.log(res.data);
  };

  return (
    <section className={styles.bb__gm_container}>
      <h2 className={styles.bb__gm_title}>Введите код из СМС</h2>
      <p className={styles.bb__gm_text}>
        Мы отправили код подтверждения на номер {phone}
      </p>
      <Otp value={otp} onChange={(value) => setOtp(value)} />
      <div className={styles.bb__gm_footer}>
        <p>Запросить код повторно можно через 32 сек</p>
        <p>
          Ошиблись при вводе номера?
          <Button theme={ButtonThemes.CLEAN} onClick={sendToServer}>
            Изменить
          </Button>
        </p>
      </div>
    </section>
  );
};
