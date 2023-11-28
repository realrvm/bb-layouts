import { FC } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/cn";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type ApplicationProps = Record<string, never>;

export const Application: FC<ApplicationProps> = () => {
  return (
    <div className={styles.bb__req_application_wrapper}>
      <BackButton />
      <div className={styles.bb__req_application_inner}>
        <div className={styles.bb__req_application_content}>
          <div className={styles.bb__req_application_content_title}>
            <BackButton />
            <div>
              <h2>Заявка на займ</h2>
              <span
                className={cn(styles.bb__req_application_content_answer, {}, [
                  styles["bb__green"],
                ])}
              >
                Одобрена
              </span>
            </div>
          </div>
          <div className={styles.bb__req_application_content_title}>
            <h2>Заявка на займ</h2>
            <span
              className={cn(styles.bb__req_application_content_answer, {}, [
                styles["bb__orange"],
              ])}
            >
              Рассматривается
            </span>
          </div>
          <div className={styles.bb__req_application_content_title}>
            <h2>Заявка на займ</h2>
            <span
              className={cn(styles.bb__req_application_content_answer, {}, [
                styles["bb__red"],
              ])}
            >
              Не одобрена
            </span>
          </div>

          <div className={styles.bb__req_application_btns}>
            <AppLink to="/applying/applying_sum" theme={AppLinkThemes.PRIMARY}>
              Клиентам
            </AppLink>
            <AppLink to="/requests/req_all" theme={AppLinkThemes.CLEAN}>
              Агентам
            </AppLink>
          </div>
          <form className={styles.bb__req_application_form}>
            <label htmlFor="card">Номер карты</label>
            <input type="text" id="card" />
            <label htmlFor="fio">ФИО получателя полностью</label>
            <input type="text" id="fio" />
            <div className={styles.bb__req_application_form_warn}>
              <span
                className={styles.bb__req_application_form_warn_icon}
              ></span>
              <span>
                Данные держателя карты должны совпадать с данными заёмщика
              </span>
            </div>
            <Button
              type="submit"
              onClick={() => console.log("получить деньги")}
              theme={ButtonThemes.PRIMARY}
            >
              Получить деньги
            </Button>
          </form>
          <div className={styles.bb__req_application_call}>
            <p>
              Для получения наличных денег с вами свяжется агент и назначит
              встречу
            </p>
            <Button
              onClick={() => console.log("запросить звонок")}
              theme={ButtonThemes.PRIMARY}
            >
              Запросить звонок
            </Button>
          </div>
          <div className={styles.bb__req_application_delay}>
            <h5>На рассмотрении</h5>
            <p>В течении 20 мин. с вами свяжется наш менеджер</p>
          </div>
          <div className={styles.bb__req_application_delay}>
            <h5>Заявка не одобрена</h5>
            <p>К сожалению ваша заявка на займ не одобрена</p>
          </div>
        </div>
        <div className={styles.bb__req_application_gen}>
          <dl>
            <dt>Сумма займа</dt>
            <dd>50 000 ₽</dd>
          </dl>
          <dl>
            <dt>Срок</dt>
            <dd>36 месяцев</dd>
          </dl>
          <dl>
            <dt>Авто</dt>
            <dd>Kia K5, 2019, XYZ12-3456789</dd>
          </dl>
          <dl>
            <dt>Рекомендуемый платёж</dt>
            <dd>22 124 ₽</dd>
          </dl>
          <dl>
            <dt>Обязательный платёж</dt>
            <dd>11 062 ₽</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
