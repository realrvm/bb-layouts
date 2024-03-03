import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";

import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";
import { ApplyingBackBtn } from "../shared/applying-back-btn/ApplyingBackBtn";
import { Button, ButtonThemes } from "@/shared/ui/button";

import { useGetAutoDescr, useGetPlateId } from "../../model/api/reports";
import { InputPlateMask } from "@/shared/ui/input-plate-mask";
import { InputRegionMask } from "@/shared/ui/input-region-mask";
import {
  CORRECT_PLATE_LENGTH,
  LONG_REGION_NUMBER,
  POLLING_INTERVAL,
  SHORT_REGION_NUMBER,
} from "@/shared/lib/const";
import { useCreateModel, useGetBrands, useGetModel } from "../..";

import { AutoDescrSchema } from "../../model/types";

import styles from "./styles.module.scss";

type ApplyingAutoProps = Record<string, never>;

type ApplyingAutoCheckProps = {
  autoData: {
    vin: string | null;
    manufacture_year: number;
    model: { name: string };
    make: { name: string };
    body: string;
  };
  setIsManualInput: (val: boolean) => void;
};

type VehicleBrandType = {
  id: string;
  name: string;
};

type VehicleBrandTypeWithLabel = {
  id: string;
  label: string;
};

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

const ApplyingAutoCheck: FC<ApplyingAutoCheckProps> = memo(
  ({ autoData, setIsManualInput }) => {
    const { make, model, manufacture_year, vin, body } = autoData || {};

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
            <dd>{vin ?? body ?? "Не определено"}</dd>
          </dl>
        </div>
        <Button
          theme={ButtonThemes.OUTLINE}
          onClick={() => setIsManualInput(true)}
        >
          Это не моё авто
        </Button>
      </div>
    );
  },
);

const AsyncSelectBrandsComponent = ({
  list,
  setVehiclesList,
  setModel,
  setBrand,
}: {
  list: VehicleBrandType[];
  setVehiclesList: any;
  setModel: (val: string) => void;
  setBrand: (val: VehicleBrandTypeWithLabel) => void;
}) => {
  const [getModel] = useGetModel();

  const listWithLabel = list.map((el: VehicleBrandType) => ({
    id: el?.id.toString(),
    label: el?.name,
  }));

  const filter = (inputValue: string) => {
    return listWithLabel.filter((i) => {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  const listOptions = (inputValue: string) =>
    new Promise<VehicleBrandTypeWithLabel[]>((resolve) => {
      setTimeout(() => {
        resolve(filter(inputValue));
      }, 300);
    });

  const handleAsyncSelect = (val: SingleValue<VehicleBrandTypeWithLabel>) => {
    async function fetchModel() {
      try {
        if (val) {
          setModel("");
          setBrand(val);
          const { results } = await getModel(val.id).unwrap();
          setVehiclesList(results);
        }
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }

    fetchModel();
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={listWithLabel}
      loadOptions={listOptions}
      placeholder={false}
      onChange={handleAsyncSelect}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid #e2e2e2",
          padding: "2px",
          borderRadius: "8px",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        noOptionsMessage: (baseStyles) => ({
          ...baseStyles,
          color: "#fff",
          height: 0,
          width: 0,
        }),
      }}
    />
  );
};

const AsyncSelectModelsComponent = ({
  list,
  model,
  setModel,
}: {
  list: VehicleBrandType[];
  model: VehicleBrandTypeWithLabel;
  setModel: (val: SingleValue<VehicleBrandTypeWithLabel>) => void;
}) => {
  const listWithLabel = list.map((el: VehicleBrandType) => ({
    id: el?.id.toString(),
    label: el?.name,
  }));

  const filter = (inputValue: string) => {
    return listWithLabel.filter((i) => {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  let listOptions = (inputValue: string) =>
    new Promise<VehicleBrandTypeWithLabel[]>((resolve) => {
      setTimeout(() => {
        resolve(filter(inputValue));
      }, 300);
    });

  const handleAsyncSelect = (
    val: SingleValue<{ id: string; label: string }>,
  ) => {
    setModel(val);
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={listWithLabel}
      loadOptions={listOptions}
      placeholder={false}
      value={model}
      onChange={handleAsyncSelect}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid #e2e2e2",
          padding: "2px",
          borderRadius: "8px",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        noOptionsMessage: (baseStyles) => ({
          ...baseStyles,
          color: "#fff",
          height: 0,
          width: 0,
        }),
      }}
    />
  );
};

const ApplyingAutoManualCheck = ({
  setBrand,
  model,
  setModel,
  manualVin,
  setManualVin,
  manualManufactureYear,
  setManualManufactureYear,
}: any) => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [brandsList, setBrandsList] = useState<VehicleBrandType[]>([]);

  const [getBrandsList] = useGetBrands();

  useEffect(() => {
    async function fetchVehiclesAndBrandsLists() {
      try {
        const brands = await getBrandsList().unwrap();
        setBrandsList(brands?.results);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }

    fetchVehiclesAndBrandsLists();
  }, []);

  const handleManufactureYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, maxLength } = e.target;

    const onlyDigits = value.replace(/\D/g, "").slice(0, maxLength);

    setManualManufactureYear(onlyDigits);
  };

  return (
    <div className={styles.bb__applying_auto_check}>
      <h5>Это ваш авто? Проверьте корректность данных</h5>
      <div className={styles.bb__applying_auto_check_item_i}>
        <div>
          <label>Марка авто</label>
          <div className={styles.bb__applying_select_wrap}>
            <AsyncSelectBrandsComponent
              list={brandsList}
              setVehiclesList={setVehiclesList}
              setModel={setModel}
              setBrand={setBrand}
            />
          </div>
        </div>
        <div>
          <label>Модель авто</label>
          <div className={styles.bb__applying_select_wrap}>
            <AsyncSelectModelsComponent
              list={vehiclesList}
              model={model}
              setModel={setModel}
            />
          </div>
        </div>
      </div>
      <div className={styles.bb__applying_auto_check_item_i}>
        <div>
          <label htmlFor="id3">Год выпуска</label>
          <div className={styles.bb__applying_select_wrap}>
            <input
              type="text"
              inputMode="numeric"
              id="id3"
              value={manualManufactureYear}
              onChange={handleManufactureYear}
              maxLength={4}
            />
          </div>
        </div>
        <div>
          <label htmlFor="id4">Номер кузова/VIN</label>
          <div className={styles.bb__applying_select_wrap}>
            <input
              type="text"
              id="id4"
              value={manualVin}
              onChange={(e) => setManualVin(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApplyingAuto: FC<ApplyingAutoProps> = () => {
  const [pollingInterval, setPollingInterval] = useState(POLLING_INTERVAL);
  const [isManualInput, setIsManualInput] = useState(false);
  const [plate, setPlate] = useState("");
  const [region, setRegion] = useState("");
  const [autoDataValue, setAutoDataValue] = useState<
    AutoDescrSchema | undefined
  >();
  const [brand, setBrand] = useState<VehicleBrandTypeWithLabel | string>("");
  const [model, setModel] = useState<VehicleBrandTypeWithLabel | string>("");
  const [manualVin, setManualVin] = useState("");
  const [manualManufactureYear, setManualManufactureYear] = useState("");

  const navigate = useNavigate();
  const isManualFullComplect: boolean =
    !!brand && !!model && !!manualManufactureYear && !!manualVin;

  const [
    getPlateId,
    { data, isFetching: isFetchingPlateId, isSuccess: isSuccessFetchingPlate },
  ] = useGetPlateId();

  const [createModel] = useCreateModel({
    fixedCacheKey: "shared-create-model-post",
  });

  const [
    getAutoData,
    {
      data: dataAuto,
      isFetching: isFetchingAutoData,
      isSuccess: isSuccessFetchingAutoData,
    },
  ] = useGetAutoDescr({ pollingInterval });

  useEffect(() => {
    async function fetchAutoData() {
      if (isSuccessFetchingPlate && data?.uid) {
        const res = await getAutoData({ id: data?.uid || "" }).unwrap();
        setAutoDataValue(res);
      }
    }

    fetchAutoData();
  }, [data?.uid]);

  useEffect(() => {
    isSuccessFetchingAutoData && setPollingInterval(0);
  }, [dataAuto?.uid]);

  const handlePlateRequest = useCallback(() => {
    !!pollingInterval && setPollingInterval(POLLING_INTERVAL);
    isPlateTheRequiredLength(plate, region) &&
      getPlateId({ plate: plate + region });
  }, [pollingInterval, plate, region, isPlateTheRequiredLength, getPlateId]);

  const handleGoToDocPage = useCallback(async () => {
    const { manufacture_year, model, body, vin } = autoDataValue || {};
    try {
      if (manufacture_year && model && model.id && !isManualInput) {
        await createModel({
          model: model.id,
          manufacture_year: manufacture_year?.toString(),
          plate: plate + region,
          body,
          vin,
        }).unwrap();

        navigate("/applying/applying_docs");
      }

      if (isManualInput) {
        // await createModel({
        //   model: brand.id,
        //   manufacture_year: manualManufactureYear?.toString(),
        //   plate: plate + region,
        //   body,
        //   vin: manualVin,
        // }).unwrap();

        navigate("/applying/applying_docs");
      }
    } catch (e) {
      if (e instanceof Error) alert(e.message);
    }
  }, [autoDataValue, isManualInput]);

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
          {autoDataValue?.uid && !isManualInput ? (
            <ApplyingAutoCheck
              autoData={autoDataValue}
              setIsManualInput={setIsManualInput}
            />
          ) : null}
          {isManualInput && (
            <ApplyingAutoManualCheck
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              manualVin={manualVin}
              setManualVin={setManualVin}
              manualManufactureYear={manualManufactureYear}
              setManualManufactureYear={setManualManufactureYear}
            />
          )}
        </div>
        <div className={styles.bb__applying_auto_line}></div>
        <div className={styles.bb__applying_auto_btn}>
          <ApplyingBackBtn />
          <Button
            theme={ButtonThemes.PRIMARY}
            onClick={handleGoToDocPage}
            disabled={
              !isManualInput
                ? !isSuccessFetchingAutoData
                : !isManualFullComplect
            }
          >
            Продолжить
          </Button>
        </div>
      </div>
      {/**
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
      */}
    </>
  );
};
