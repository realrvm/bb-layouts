import { FC, memo, useCallback, useEffect, useState } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";
import { Button, ButtonThemes } from "@/shared/ui/button";

import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";
import { ApplyingBackBtn } from "../shared/applying-back-btn/ApplyingBackBtn";
import { cn } from "@/shared/lib/cn";

import { useGetAutoDescr, useGetPlateId } from "@/features/serve";
import { InputPlateMask } from "@/shared/ui/input-plate-mask";
import { InputRegionMask } from "@/shared/ui/input-region-mask";
import {
  CORRECT_PLATE_LENGTH,
  LONG_REGION_NUMBER,
  POLLING_INTERVAL,
  SHORT_REGION_NUMBER,
} from "@/shared/lib/const";

import styles from "./styles.module.scss";

type ApplyingAutoProps = Record<string, never>;
type ApplyingAutoCheckProps = {
  autoData: {
    vin: string | null;
    manufacture_year: number;
    model: { name: string };
    make: { name: string };
  };
};

const ApplyingAutoCheck: FC<ApplyingAutoCheckProps> = memo(({ autoData }) => {
  const { make, model, manufacture_year, vin } = autoData || {};

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
          <dd>{vin ?? "Не определено"}</dd>
        </dl>
      </div>
      <Button theme={ButtonThemes.OUTLINE} onClick={() => {}}>
        Это не моё авто
      </Button>
    </div>
  );
});

/**
 * Function to check if the plate is the required length
 * @param {string} - plate
 * @param {string} - region
 * @returns {boolean}
 */
function isPlateTheRequiredLength(plate: string, region: string): boolean {
  return (
    plate.length === CORRECT_PLATE_LENGTH &&
    (region.length === SHORT_REGION_NUMBER ||
      region.length === LONG_REGION_NUMBER)
  );
}

export const ApplyingAuto: FC<ApplyingAutoProps> = () => {
  const [pollingInterval, setPollingInterval] = useState(POLLING_INTERVAL);
  const [plate, setPlate] = useState("");
  const [region, setRegion] = useState("");

  const [
    getPlateId,
    { data, isFetching: isFetchingPlateId, isSuccess: isSuccessFetchingPlate },
  ] = useGetPlateId();

  const [
    getAutoData,
    {
      currentData: dataAuto,
      isFetching: isFetchingAutoData,
      isSuccess: isSuccessFetchingAutoData,
    },
  ] = useGetAutoDescr({ pollingInterval });

  useEffect(() => {
    if (isSuccessFetchingPlate && data?.uid) {
      getAutoData({ id: data?.uid || "" });
    }
  }, [data?.uid]);

  useEffect(() => {
    isSuccessFetchingAutoData && setPollingInterval(0);
  }, [dataAuto?.uid]);

  const handlePlateRequest = useCallback(() => {
    !!pollingInterval && setPollingInterval(POLLING_INTERVAL);
    isPlateTheRequiredLength(plate, region) &&
      getPlateId({ plate: plate + region });
  }, [pollingInterval, plate, region, isPlateTheRequiredLength, getPlateId]);

  return (
    <>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"two"} />
        <div className={styles.bb__applying_inner}>
          <h4>Введите данные залогового автомобиля</h4>
          <p>Мы автоматически заполним данные</p>
          <div className={styles.bb__applying_auto_define}>
            <div className={styles.bb__applying_auto_define_inputs}>
              <InputPlateMask
                onSetPlate={setPlate}
                disabled={isFetchingPlateId || isFetchingAutoData}
              />
              <div className={styles.bb__applying_auto_define_inputs_wrap}>
                <InputRegionMask
                  onSetRegion={setRegion}
                  disabled={isFetchingPlateId || isFetchingAutoData}
                  focus={plate.length === CORRECT_PLATE_LENGTH}
                />
                <div
                  className={styles.bb__applying_auto_define_inputs_wrap_code}
                >
                  RUS
                </div>
              </div>
            </div>
            <Button
              theme={ButtonThemes.PRIMARY}
              onClick={handlePlateRequest}
              disabled={
                !isPlateTheRequiredLength(plate, region) ||
                isFetchingPlateId ||
                isFetchingAutoData
              }
            >
              Определить авто
            </Button>
          </div>
          {dataAuto ? <ApplyingAutoCheck autoData={dataAuto} /> : null}
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
