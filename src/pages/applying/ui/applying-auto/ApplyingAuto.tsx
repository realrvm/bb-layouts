import { FC, useEffect, useState } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { Button, ButtonThemes } from "@/shared/ui/button";

import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";
import { ApplyingBackBtn } from "../shared/applying-back-btn/ApplyingBackBtn";
import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

import { useGetAutoDescr, useGetPlateId } from "@/features/serve";

type ApplyingAutoProps = Record<string, never>;
//type ApplyingAutoCheckProps = Record<string, never>;

const ApplyingAutoCheck: FC<any> = ({autoDescr}) => {
  console.log(autoDescr)
  const { make, model, manufacture_year } = autoDescr || {};

  return (
    <div className={styles.bb__applying_auto_check}>
      <h5>Это ваш авто? Проверьте корректность данных</h5>
      <div className={styles.bb__applying_auto_check_item}>
        <dl>
          <dt>Марка авто</dt>
          <dd>{make?.name}</dd>
        </dl>
        <dl>
          <dt>Модель авто</dt>
          <dd>{model?.name}</dd>
        </dl>
      </div>
      <div className={styles.bb__applying_auto_check_item}>
        <dl>
          <dt>Год выпуска</dt>
          <dd>{manufacture_year}</dd>
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
  );
};

export const ApplyingAuto: FC<ApplyingAutoProps> = () => {
  const [skip, setSkip] = useState(true);
  const [polling, setPolling] = useState(true);

  const { data, isLoading: isLoadingPlateId } = useGetPlateId(
    { plate: "Н492ТЕ198" },
    { skip },
  );

  const { data: dataAuto, isLoading: isLoadingAutoDescr } = useGetAutoDescr(
    { id: data?.uid },
    {
      pollingInterval: polling ? 1000 : undefined,
      skip: data?.uid ? false : true,
    },
  );

  useEffect(() => {
    setPolling(false);
  }, [dataAuto]);

  const IsLoading = () => {
    return isLoadingPlateId || isLoadingAutoDescr ? (
      <div>Loading...</div>
    ) : null;
  };

  return (
    <>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div className={styles.bb__applying_auto_define_inputs}>
              <input type="text" placeholder="A 000 АА" />
              <div className={styles.bb__applying_auto_define_inputs_wrap}>
                <input type="text" placeholder="00" />
                <div
                  className={styles.bb__applying_auto_define_inputs_wrap_code}
                >
                  RUS
                </div>
              </div>
            </div>
            <Button
              theme={ButtonThemes.PRIMARY}
              onClick={() => setSkip((prev) => !prev)}
            >
              Определить авто
            </Button>
          </div>
          <IsLoading />
          {dataAuto ? <ApplyingAutoCheck autoDescr={dataAuto} /> : null}
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_docs" theme={AppLinkThemes.PRIMARY}>
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
            <div className={styles.bb__applying_auto_define_inputs}>
              <input type="text" placeholder="A 000 АА" />
              <div className={styles.bb__applying_auto_define_inputs_wrap}>
                <input type="text" placeholder="00" />
                <div
                  className={styles.bb__applying_auto_define_inputs_wrap_code}
                >
                  RUS
                </div>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
          <ApplyingAutoCheck />
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_docs" theme={AppLinkThemes.PRIMARY}>
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
            <div className={styles.bb__applying_auto_define_inputs}>
              <input type="text" placeholder="A 000 АА" />
              <div className={styles.bb__applying_auto_define_inputs_wrap}>
                <input type="text" placeholder="00" />
                <div
                  className={styles.bb__applying_auto_define_inputs_wrap_code}
                >
                  RUS
                </div>
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
          <AppLink to="/applying/applying_docs" theme={AppLinkThemes.PRIMARY}>
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
            <div className={styles.bb__applying_auto_define_inputs}>
              <input type="text" placeholder="A 000 АА" />
              <div className={styles.bb__applying_auto_define_inputs_wrap}>
                <input type="text" placeholder="00" />
                <div
                  className={styles.bb__applying_auto_define_inputs_wrap_code}
                >
                  RUS
                </div>
              </div>
            </div>
            <Button theme={ButtonThemes.PRIMARY}>Определить авто</Button>
          </div>
          <div
            className={cn(styles.bb__applying_auto_check, {
              [styles["bb__failed"]]: true,
            })}
          >
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
          <AppLink to="/applying/applying_docs" theme={AppLinkThemes.PRIMARY}>
            Продолжить
          </AppLink>
        </div>
      </div>
    </>
  );
};
