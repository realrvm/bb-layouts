import { FC, memo } from "react";

import { BackButton, Button, ButtonThemes } from "@/shared/ui/button";

import { cn } from "@/shared/lib/cn";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { usePreviewImage } from "@/shared/lib/hooks/usePreviewImage";

import styles from "./styles.module.scss";

type ApplicationProps = Record<string, never>;

type ApplicationUploadProps = {
  multiple?: boolean;
};

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

          <div className={styles.bb__req_application_card}>
            <h4>Прикрепите следующие документы</h4>
            <div className={styles.bb__req_application_card_docs}>
              <div className={styles.bb__req_application_card_docs_descr}>
                <h5>1. Фото паспорта (Разворот с фото)</h5>
                <p>
                  На фото должно быть разборчиво видно ваше ФИО и фотографию
                </p>
              </div>
              <ApplicationUpload />
            </div>
            <div className={styles.bb__req_application_card_docs}>
              <div className={styles.bb__req_application_card_docs_descr}>
                <h5>2. Фото паспорта (Разворот с пропиской)</h5>
              </div>
              <ApplicationUpload />
            </div>
            <div className={styles.bb__req_application_card_docs}>
              <div className={styles.bb__req_application_card_docs_descr}>
                <h5>3. ПТС (Все страницы)</h5>
              </div>
              <ApplicationUpload multiple={true} />
            </div>
          </div>
          <Button theme={ButtonThemes.PRIMARY}>Далее</Button>

          <div className={styles.bb__req_application_card}>
            <div className={styles.bb__req_application_card_btns}>
              <AppLink
                to="/applying/applying_sum"
                theme={AppLinkThemes.WO_HOVER}
              >
                На карту
              </AppLink>
              <AppLink to="/account/account_all" theme={AppLinkThemes.CLEAN}>
                Hаличные
              </AppLink>
            </div>
            <h4>Введите ваши данные</h4>
            <div className={styles.bb__req_application_card_inputs}>
              <label htmlFor="card">Номер карты</label>
              <input type="text" id="card" />
              <label htmlFor="fio">ФИО получателя полностью</label>
              <input type="text" id="fio" />
            </div>
            <div className={styles.bb__req_application_card_warn}>
              <span
                className={styles.bb__req_application_card_warn_icon}
              ></span>
              <span>
                Данные держателя карты должны совпадать с данными заёмщика
              </span>
            </div>
          </div>
          <Button theme={ButtonThemes.PRIMARY}>Получить деньги</Button>

          <div className={styles.bb__req_application_card}>
            <h5>В течении 20 мин. с вами свяжется наш менеджер</h5>
          </div>

          <div className={styles.bb__req_application_card}>
            <div className={styles.bb__req_application_card_btns}>
              <AppLink
                to="/applying/applying_sum"
                theme={AppLinkThemes.WO_HOVER}
              >
                На карту
              </AppLink>
              <AppLink to="/account/account_all" theme={AppLinkThemes.CLEAN}>
                Hаличные
              </AppLink>
            </div>
            <h4>
              Для получения наличных денег с вами свяжется агент и назначит
              встречу
            </h4>
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
            <dt>Процентная ставка</dt>
            <dd>24%</dd>
          </dl>
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

const ApplicationUpload: FC<ApplicationUploadProps> = memo(
  ({ multiple = false }) => {
    const { previewImage, handleSelectImage } = usePreviewImage();

    return (
      <div className={styles.bb__req_application_card_docs_img_wrap}>
        {previewImage ? (
          <div className={styles.bb__req_application_card_docs_img}>
            <img src={previewImage as string} alt="preview" />
          </div>
        ) : (
          <label className={styles.bb__req_application_card_label}>
            <span>Прикрепить</span>
            <input
              multiple={multiple}
              type="file"
              name="file"
              onChange={handleSelectImage}
              accept="image/*"
            />
          </label>
        )}
      </div>
    );
  },
);
