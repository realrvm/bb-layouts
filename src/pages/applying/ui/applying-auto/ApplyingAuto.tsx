import { FC } from "react";

import { ApplyingTitle } from "../applying-title/ApplyingTitle";
import styles from "./styles.module.scss";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { ApplyingBackBtn } from "../applying-back-btn/ApplyingBackBtn";
import { Button, ButtonThemes } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

type ApplyingAutoProps = {
  className?: string;
};

export const ApplyingAuto: FC<ApplyingAutoProps> = () => {
  return (
    <>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div
              className={cn(styles.bb__applying_auto_define_number, {
                [styles["not_defined"]]: true,
              })}
            >
              <span>A 000 АА</span>
              <div className={styles.bb__applying_auto_define_number_code}>
                <div>00</div>
                <span>RUS</span>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
            Продолжить
          </AppLink>
        </div>
      </div>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div
              className={cn(styles.bb__applying_auto_define_number, {
                [styles["not_defined"]]: false,
              })}
            >
              <span>A 847 АХ</span>
              <div className={styles.bb__applying_auto_define_number_code}>
                <div>190</div>
                <span>RUS</span>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
          <div className={styles.bb__applying_auto_check}>
            <h5>Это ваш авто? Проверьте корректность данных</h5>
            <div className={styles.bb__applying_auto_check_item}>
              <dl>
                <dt>Марка авто</dt>
                <dd>Kia</dd>
              </dl>
              <dl>
                <dt>Модель авто</dt>
                <dd>K5</dd>
              </dl>
            </div>
            <div className={styles.bb__applying_auto_check_item}>
              <dl>
                <dt>Год выпуска</dt>
                <dd>2019</dd>
              </dl>
              <dl>
                <dt>Номер кузова/VIN</dt>
                <dd>XYZ12-3456789</dd>
              </dl>
            </div>
            <Button theme={ButtonThemes.OUTLINE} onClick={() => {}}>
              Это не моё авто
            </Button>
          </div>
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
            Продолжить
          </AppLink>
        </div>
      </div>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div
              className={cn(styles.bb__applying_auto_define_number, {
                [styles["not_defined"]]: false,
              })}
            >
              <span>A 847 АХ</span>
              <div className={styles.bb__applying_auto_define_number_code}>
                <div>190</div>
                <span>RUS</span>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
          <div className={styles.bb__applying_auto_check}>
            <h5>Это ваш авто? Проверьте корректность данных</h5>
            <div className={styles.bb__applying_auto_check_item_i}>
              <div>
                <label htmlFor="id1">Марка авто</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id1"></select>
                </div>
              </div>
              <div>
                <label htmlFor="id2">Модель авто</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id2"></select>
                </div>
              </div>
            </div>
            <div className={styles.bb__applying_auto_check_item_i}>
              <div>
                <label htmlFor="id3">Год выпуска</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id3"></select>
                </div>
              </div>
              <div>
                <label htmlFor="id4">Номер кузова/VIN</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id4"></select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
            Продолжить
          </AppLink>
        </div>
      </div>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div
              className={cn(styles.bb__applying_auto_define_number, {
                [styles["not_defined"]]: false,
              })}
            >
              <span>A 847 АХ</span>
              <div className={styles.bb__applying_auto_define_number_code}>
                <div>190</div>
                <span>RUS</span>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
          <div className={styles.bb__applying_auto_check}>
            <div className={styles.bb__applying_auto_check_warn}>
              <span></span>
              <div>
                Не удалось автозаполнить данные авто. Выберите параметры вашего
                авто вручную
              </div>
            </div>
            <div className={styles.bb__applying_auto_check_item_i}>
              <div>
                <label htmlFor="id1">Марка авто</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id1"></select>
                </div>
              </div>
              <div>
                <label htmlFor="id2">Модель авто</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id2"></select>
                </div>
              </div>
            </div>
            <div className={styles.bb__applying_auto_check_item_i}>
              <div>
                <label htmlFor="id3">Год выпуска</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id3"></select>
                </div>
              </div>
              <div>
                <label htmlFor="id4">Номер кузова/VIN</label>
                <div className={styles.bb__applying_select_wrap}>
                  <select id="id4"></select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_auto" theme={AppLinkThemes.PRIMARY}>
            Продолжить
          </AppLink>
        </div>
      </div>
    </>
  );
};
