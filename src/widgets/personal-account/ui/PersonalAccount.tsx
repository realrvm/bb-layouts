import { FC } from "react";

import { Container } from "@/widgets/container";

import { AppImage } from "@/shared/ui/app-image";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import phone from "@/shared/assets/images/phone.png";

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
            <AppLink
              to="/personal-account"
              theme={AppLinkThemes.PRIMARY}
              className={styles.bb__pa_details_link}
            >
              Войти в личный кабинет
            </AppLink>
          </div>
        </div>
      </div>
    </Container>
  );
};
