import { FC, memo } from "react";

import { Container } from "@/widgets/container";

import { AppImage } from "@/shared/ui/app-image";
import phone from "@/shared/assets/images/phone.png";
import { Button, ButtonThemes } from "@/shared/ui/button";

import { useHandleProfile } from "@/shared/lib/hooks/useHandleProlile";

import styles from "./styles.module.scss";

type PersonalAccountProps = Record<string, never>;

export const PersonalAccount: FC<PersonalAccountProps> = () => {
  return (
    <Container>
      <div className={styles.bb__pa}>
        <div className={styles.bb__pa_wrapper}>
          <div className={styles.bb__pa_img}>
            <AppImage src={phone} alt="phone" />
          </div>
          <div className={styles.bb__pa_details}>
            <h3>
              Личный кабинет
              <br />
              для работы с займами
            </h3>
            <ul>
              <li>
                <span className={styles.bb__pa_details_icon_card}></span>
                <span>Внести платёж банковской картой без комиссии</span>
              </li>
              <li>
                <span className={styles.bb__pa_details_icon_calendar}></span>
                <span>Проверить график платежей</span>
              </li>
              <li>
                <span className={styles.bb__pa_details_icon_info}></span>
                <span>Посмотреть информацию по договору</span>
              </li>
              <li>
                <span className={styles.bb__pa_details_icon_sum}></span>
                <span>Узнать сумму для полного погашения</span>
              </li>
            </ul>
            <PersonalAccountLink />
          </div>
        </div>
      </div>
    </Container>
  );
};

const PersonalAccountLink: FC<PersonalAccountProps> = memo(() => {
  const { isProfileFetching, handleProfileClick } = useHandleProfile();

  return (
    <Button
      disabled={isProfileFetching}
      onClick={handleProfileClick}
      theme={ButtonThemes.PRIMARY}
      className={styles.bb__pa_details_link}
    >
      Войти в личный кабинет
    </Button>
  );
});
