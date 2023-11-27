import { FC } from "react";

import { BackButton } from "@/shared/ui/button";

import styles from "./styles.module.scss";

type ReqPersonalPtsProps = Record<string, never>;

export const ReqPersonalPts: FC<ReqPersonalPtsProps> = () => {
  return (
    <div className={styles.bb__req_personal_pts_wrapper}>
      <BackButton />
      <h2>ПТС</h2>
      <div className={styles.bb__req_personal_pts_inner}>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Автомобиль</dt>
            <dd>Kia K5</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Категория ТС</dt>
            <dd>B</dd>
          </dl>
          <dl>
            <dt>Госномер</dt>
            <dd>А 654 МХ 27</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Номер кузова</dt>
            <dd>XYZ12-3456789</dd>
          </dl>
          <dl>
            <dt>Модель, № двигателя</dt>
            <dd>Отсутствует</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Номер шасси</dt>
            <dd>Отсутствует</dd>
          </dl>
          <dl>
            <dt>Год</dt>
            <dd>2019</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Масса автомобиля</dt>
            <dd>1410 кг</dd>
          </dl>
          <dl>
            <dt>Расположение руля</dt>
            <dd>правый руль</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Объем двигателя</dt>
            <dd>2994 куб. см</dd>
          </dl>
          <dl>
            <dt>Мощность</dt>
            <dd>210 л. с.</dd>
          </dl>
        </div>
        <div className={styles.bb__req_personal_pts_inner_item}>
          <dl>
            <dt>Цвет кузова</dt>
            <dd>Серый</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
