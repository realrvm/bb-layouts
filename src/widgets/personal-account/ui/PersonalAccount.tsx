import { FC } from "react";

import { Container } from "@/widgets/container";

import card from "@/shared/assets/icons/credit-card.svg";
import calendar from "@/shared/assets/icons/calendar.svg";
import info from "@/shared/assets/icons/news.svg";
import sum from "@/shared/assets/icons/sum.svg";

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
                <span>
                  <AppImage src={card} />
                </span>
                <span>Внести платёж банковской картой без комиссии</span>
              </li>
              <li>
                <span>
                  <AppImage src={calendar} />
                </span>
                <span>Проверить график платежей</span>
              </li>
              <li>
                <span>
                  <AppImage src={info} />
                </span>
                <span>Посмотреть информацию по договору</span>
              </li>
              <li>
                <span>
                  <AppImage src={sum} />
                </span>
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
