import { FC } from "react";

import logo from "@/shared/assets/images/logo.png";
import bor from "@/shared/assets/images/bor.png";
import mir from "@/shared/assets/images/mir.png";

import { AppImage } from "@/shared/ui/app-image";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { Container } from "@/widgets/container";

import {
  BIBIMONEY_ADRESS,
  BIBIMONEY_COMPANY,
  BIBIMONEY_INN,
  BIBIMONEY_KPP,
  BIBIMONEY_OGRN,
} from "../const";

import styles from "./styles.module.scss";

type FooterProps = Record<string, never>;

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.bb__footer}>
      <Container>
        <div className={styles.bb__footer_wrapper}>
          <div className={styles.bb__footer_head}>
            <AppLink to="/">
              <AppImage src={logo} alt="logo" width={150} height={34} />
            </AppLink>
            <AppLink to="/reg/reg_form" theme={AppLinkThemes.PRIMARY}>
              Получить займ
            </AppLink>
          </div>
          <div className={styles.bb__footer_details}>
            <div className={styles.bb__footer_details_item}>
              <p>{BIBIMONEY_COMPANY}</p>
              <AppLink to="*">Центр раскрытия корпоративной информации</AppLink>
            </div>
            <div className={styles.bb__footer_details_item}>
              <dl>
                <dt>КПП</dt>
                <dd>{BIBIMONEY_KPP}</dd>
              </dl>
              <dl>
                <dt>ИНН</dt>
                <dd>{BIBIMONEY_INN}</dd>
              </dl>
              <dl>
                <dt>ОГРН</dt>
                <dd>{BIBIMONEY_OGRN}</dd>
              </dl>
              <dl>
                <dt>Адрес</dt>
                <dd>{BIBIMONEY_ADRESS}</dd>
              </dl>
            </div>
          </div>
          <div className={styles.bb__footer_banks}>
            <div className={styles.bb__footer_banks_item}>
              <AppImage src={bor} width={112} />
              <AppLink to="*">Официальный сайт Банка России</AppLink>
              <AppLink to="*">Интернет-приемная</AppLink>
              <AppLink to="*">
                Реестры субъектов рынка микрофинансирования
              </AppLink>
            </div>
            <div className={styles.bb__footer_banks_item}>
              <AppImage src={mir} width={118} />
              <AppLink to="*">Официальный сайт СРО «МИР»</AppLink>
              <AppLink to="*">Интернет-приёмная</AppLink>
              <p>
                107078, г. Москва, Орликов переулок, д.5, стр.1, этаж 2, пом.11
              </p>
            </div>
          </div>
          <div className={styles.bb__footer_info}>
            <div className={styles.bb__footer_info_title}>
              ИНФОРМАЦИЯ О ПРАВЕ ПОТРЕБИТЕЛЕЙ ФИНАНСОВЫХ УСЛУГ НА НАПРАВЛЕНИЕ
              ОБРАЩЕНИЯ ФИНАНСОВОМУ УПОЛНОМОЧЕННОМУ
            </div>
            <div className={styles.bb__footer_info_items}>
              <div className={styles.bb__footer_info_item}>
                В целях соблюдения досудебного порядка урегулирования споров
                потребителей с микрофинансовой организацией (в случае отказа
                микрофинансовой организации удовлетворить требования
                потребителя), потребитель вправе направить обращение финансовому
                уполномоченному (Федеральный закон от 04.06.2018 № 123-ФЗ «Об
                уполномоченном по правам потребителей финансовых услуг»).
              </div>
              <div className={styles.bb__footer_info_item}>
                <p>
                  Контакты Финансового уполномоченного для обращений
                  потребителя:
                </p>
                <p>
                  Официальный сайт <AppLink to="*">www.finombudsman.ru</AppLink>
                </p>
                <p>Номер телефона: 8 (800) 200-00-10</p>
                <p>
                  Адрес: 119017, г. Москва, Старомонетный переулок, дом 3,
                  получатель АНО
                </p>
              </div>
            </div>
          </div>
          <div className={styles.bb__footer_links}>
            <AppLink to="*">
              Информация о праве направить обращение на нарушение прав и
              законных интересов физических лиц при осуществлении деятельности
              по возврату просроченной задолженности в Федеральную службу
              судебных приставов
            </AppLink>
            <p>ООО МФК «Бибимани» 2023. Все права защищены</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
