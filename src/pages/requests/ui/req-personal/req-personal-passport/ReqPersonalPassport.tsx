import { FC } from "react";

import styles from "./styles.module.scss";
import { BackButton } from "@/shared/ui/button";

type ReqPersonalPassportProps = Record<string, never>;

export const ReqPersonalPassport: FC<ReqPersonalPassportProps> = () => {
  return (
    <div className={styles.bb__req_personal_passport_wrapper}>
      <div className={styles.bb__req_personal_passport_title}>
        <BackButton />
        <h2>Паспортные данные</h2>
      </div>
      <div className={styles.bb__req_personal_passport_inner}>
        <h4>Игорёв Игорь Игоревич</h4>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Пол</dt>
            <dd>Мужской</dd>
          </dl>
          <dl>
            <dt>Дата рождения</dt>
            <dd>11.02.1984</dd>
          </dl>
          <dl>
            <dt>Гражданство</dt>
            <dd>Россия</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Место рождения</dt>
            <dd>
              Хабаровский край г. Хабаровск, Дикопольцева д. 5, кв. 11,
              Центральный район
            </dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Серия и номер паспорта</dt>
            <dd>0425 226644</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Выдан</dt>
            <dd>
              Отделом УФМС России по Хабаровскому краю в Центральном районе гор.
              Хабаровска
            </dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Дата выдачи</dt>
            <dd>05.08.2000</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_passport_inner_item}>
          <dl>
            <dt>Код подразделения</dt>
            <dd>270-001</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
