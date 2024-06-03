import {
  FC,
  FormEventHandler,
  PropsWithChildren,
  ChangeEventHandler,
  memo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";

import { Application, ApplicationTitle } from "../Application";
import { Button } from "@/shared/ui/button";
import { InputMaskPlate } from "@/shared/ui/input-mask-plate";
import { InputMaskRegion } from "@/shared/ui/input-mask-region";

import { ButtonThemes, TargetPages } from "@/shared/lib/enums";

import { Loader } from "@/shared/ui/loader";
import {
  CORRECT_PLATE_LENGTH,
  STORAGE,
  STORAGE_EXPECTED,
} from "@/shared/lib/constants";
import {
  useGetAutoData,
  useGetBrandModel,
  useManufactureYear,
  useVinBody,
} from "../../lib/hooks";
import { cn } from "@/shared/lib/cn";
import {
  isPlateTheRequiredLength,
  replaceNameWithLabel,
} from "../../lib/utils";

import { Warn } from "@/shared/ui/icons";
import {
  ApplicationAutoCheckProps,
  FormType,
  VehicleBrandType,
  VehicleBrandTypeWithLabel,
} from "../../lib/types";

import { ZodError } from "zod";
import { vehicleSchema } from "../../config/schema";
import { useCreateModel, useSelectCarData } from "../../model/api/vehiclesApi";
import { initialForm } from "../../constants";

import styles from "./styles.module.css";
import { useExpectedPostLoan } from "@/entities/loan";
import { getOnlyDigits } from "@/widgets/calculator/lib/utils";

const ApplicationVehicle: FC = () => {
  const [plate, setPlate] = useState("");
  const [region, setRegion] = useState("");
  const [brand, setBrand] = useState<VehicleBrandTypeWithLabel>({
    id: "",
    label: "",
  });
  const [model, setModel] = useState<VehicleBrandTypeWithLabel | string>("");
  const [isManualInput, setIsManualInput] = useState(false);
  const [errors, setErrors] = useState<FormType>(initialForm);
  const [postExpectedLoan] = useExpectedPostLoan();

  useEffect(() => {
    const expectedLoan = JSON.parse(
      STORAGE.getItem(STORAGE_EXPECTED) || JSON.stringify(""),
    );

    async function fn() {
      try {
        await postExpectedLoan({
          expected_sum: getOnlyDigits(expectedLoan.expected_sum),
          expected_term: expectedLoan.expected_term,
        }).unwrap();
      } catch (e) {
        console.log(e);
      }
    }

    if (expectedLoan) {
      fn();
    }
  }, [postExpectedLoan]);

  const navigate = useNavigate();

  const [createModel] = useCreateModel({
    fixedCacheKey: "shared-create-model-post",
  });

  const [selectCarData] = useSelectCarData({
    fixedCacheKey: "shared-select-car-data",
  });

  const { handleInitiateReport, autoData, isLoading, isError } = useGetAutoData(
    plate,
    region,
    setModel,
    setErrors,
  );
  const { manufactureYear, handleManufactureYear } = useManufactureYear();
  const { vinBody, handleVinBody } = useVinBody();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const isNotAutoInput = isError || isManualInput;

      const { manufacture_year, model, body, vin } = autoData || {};

      const formData = {
        model: isNotAutoInput ? Number(brand.id) : model?.id,
        plate: plate + region,
        manufacture_year: isNotAutoInput
          ? manufactureYear
          : manufacture_year?.toString(),
        body: isNotAutoInput ? vinBody : body,
        vin: isNotAutoInput ? vinBody : vin,
        owner: 1,
      };

      try {
        vehicleSchema.parse(formData);

        await createModel(formData as any).unwrap();
        await selectCarData(formData as any).unwrap();

        navigate("/application/docs");
      } catch (e) {
        if (e instanceof ZodError) {
          const validationErrors = {} as FormType;

          e.errors.forEach((err) => {
            if (err.path) {
              validationErrors[err.path[0]] = err.message;
            }
          });

          setErrors(validationErrors);
        }

        if (e instanceof Error) {
          console.log(e);
        }
      }
    },
    [
      autoData,
      brand.id,
      isError,
      isManualInput,
      manufactureYear,
      navigate,
      plate,
      region,
      vinBody,
      selectCarData,
      createModel,
    ],
  );

  return (
    <Application>
      <ApplicationTitle>Введите данные залогового автомобиля</ApplicationTitle>
      <form className="flex flex-col md:mt-2 h-full" onSubmit={handleSubmit}>
        <div className="md:px-9">
          <p className="text-text-gray mb-6">
            Мы автоматически заполним данные
          </p>
          <div className="flex flex-col md:flex-row gap-3 mb-9">
            <div className="flex flex-col gap-1">
              <div
                className={cn(
                  "w-full md:w-[272px] border border-border-gray rounded-lg grid grid-cols-[auto_76px] uppercase focus-within:border-common-brand",
                  { "border-special-red": errors.plate },
                )}
              >
                <InputMaskPlate
                  onSetPlate={setPlate}
                  className="rounded-lg w-full outline-none uppercase placeholder:uppercase placeholder:text-text-gray border-r border-r-border-gray p-3"
                />
                <div className="pl-3">
                  <InputMaskRegion
                    onSetRegion={setRegion}
                    className="rounded-lg w-full border-0 outline-none uppercase placeholder:uppercase placeholder:text-text-gray pt-[5px]"
                    focus={plate.length === CORRECT_PLATE_LENGTH}
                  />
                  <div className={styles["flag"]}>RUS</div>
                </div>
              </div>
              {errors.plate && (
                <span className="text-small text-special-red">
                  Обязательное поле
                </span>
              )}
            </div>
            <Button
              type="button"
              className="w-full md:w-auto btn-medium mt-4 md:mt-0 self-start"
              onClick={handleInitiateReport}
              disabled={!isPlateTheRequiredLength(plate, region) || isLoading}
            >
              Определить авто
            </Button>
          </div>
          {isLoading ? (
            <Loader className="text-center" />
          ) : (
            <>
              {!isManualInput && autoData?.uid && !isError && (
                <ApplicationAutoCheck
                  setIsManualInput={setIsManualInput}
                  autoData={autoData}
                />
              )}
              {(isManualInput || isError) && (
                <ApplicationManualCheck
                  setBrand={setBrand}
                  model={model}
                  setModel={setModel}
                  isError={isError}
                  manufactureYear={manufactureYear}
                  handleManufactureYear={handleManufactureYear}
                  handleVinBody={handleVinBody}
                  vinBody={vinBody}
                  errors={errors}
                />
              )}
            </>
          )}
        </div>
        <div className="hidden md:block md:h-px bg-border-gray"></div>
        <div className="py-6 md:p-9 flex justify-between mt-auto md:mt-0 gap-2">
          <Button
            type="button"
            variant={ButtonThemes.SECONDARY}
            onClick={() => navigate(`/${TargetPages.APPLICATION_CALCULATOR}`)}
          >
            Назад
          </Button>
          <Button
            className="btn-medium flex-1 md:flex-none"
            disabled={isLoading}
          >
            Продолжить
          </Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationCheckTitle: FC<
  PropsWithChildren<{ className?: string; isError?: boolean }>
> = memo(({ className, children, isError = false }) => {
  return (
    <div className={cn("mt-6 py-6 border-t border-t-border-gray", className)}>
      {!isError ? (
        <>
          <h5 className="heading-5 mb-6">
            Это ваш авто? Проверьте корректность данных
          </h5>
          {children}
        </>
      ) : (
        <ApplicationCheckWarnTitle>{children}</ApplicationCheckWarnTitle>
      )}
    </div>
  );
});

const ApplicationCheckWarnTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="p-3 rounded-lg bg-bg-warn flex gap-2 mb-6">
        <Warn />
        <span className="-translate-y-0.5">
          Не удалось автозаполнить данные авто. Выберите параметры вашего авто
          вручную
        </span>
      </div>
      {children}
    </>
  );
};

const ApplicationAutoCheck: FC<ApplicationAutoCheckProps> = memo(
  ({ autoData, setIsManualInput }) => {
    const { make, model, manufacture_year, vin, body } = autoData || {};

    return (
      <>
        <ApplicationCheckTitle>
          <div className="grid grid-cols-2 gap-2">
            <dl>
              <dt className="mb-2">Марка авто</dt>
              <dd>{make?.name}</dd>
            </dl>
            <dl>
              <dt className="mb-2">Модель авто</dt>
              <dd>{model?.name}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-2 my-4 md:mb-6">
            <dl>
              <dt className="mb-2">Год выпуска</dt>
              <dd>{manufacture_year}</dd>
            </dl>
            <dl>
              <dt className="mb-2">Номер кузова/VIN</dt>
              <dd>{vin ?? body ?? "Не определено"}</dd>
            </dl>
          </div>
          <Button
            type="button"
            variant={ButtonThemes.SECONDARY}
            onClick={() => setIsManualInput(true)}
          >
            Это не моё авто
          </Button>
        </ApplicationCheckTitle>
      </>
    );
  },
);

const ApplicationManualCheck: FC<{
  model: SingleValue<string | VehicleBrandTypeWithLabel>;
  setModel: any;
  setBrand: any;
  isError?: boolean;
  manufactureYear: string;
  handleManufactureYear: ChangeEventHandler<HTMLInputElement>;
  vinBody: string;
  handleVinBody: ChangeEventHandler<HTMLInputElement>;
  errors: FormType;
}> = memo(
  ({
    model,
    setModel,
    setBrand,
    isError = false,
    manufactureYear,
    handleManufactureYear,
    vinBody,
    handleVinBody,
    errors,
  }) => {
    const { isFetching, brandsList, vehiclesList, handleGetModelsOfBrand } =
      useGetBrandModel(setBrand, setModel);

    return (
      <>
        <ApplicationCheckTitle className="md:mb-9" isError={isError}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div className="flex flex-col gap-2">
              <label>Марка авто</label>
              <div>
                <AsyncSelectBrand
                  list={brandsList}
                  isFetchingBrands={isFetching}
                  handleGetModelsOfBrand={handleGetModelsOfBrand}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Модель авто</label>
              <div className="flex flex-col">
                <div
                  className={cn({
                    "border border-special-red rounded-lg": errors.model,
                  })}
                >
                  <AsyncSelectModel
                    setModel={setModel}
                    model={model as string | VehicleBrandTypeWithLabel}
                    isFetchingModels={isFetching}
                    list={vehiclesList}
                  />
                </div>
                {errors.model ? (
                  <span className="text-small text-special-red mb-2">
                    Поле не должно быть пустым.
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="id3">Год выпуска</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  id="id3"
                  value={manufactureYear}
                  onChange={handleManufactureYear}
                  maxLength={4}
                  className={cn(
                    "w-full bg-common-white outline-none border border-border-gray py-2 px-3 rounded-lg focus:border-common-brand",
                    { "border-special-red": errors.manufacture_year },
                  )}
                />
                {errors.manufacture_year && (
                  <span className="text-small text-special-red">
                    Год должен быть из 4 чисел
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="id4">Номер кузова/VIN</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  id="id4"
                  className="w-full bg-common-white outline-none border border-border-gray py-2 px-3 rounded-lg focus:border-common-brand"
                  value={vinBody}
                  onChange={handleVinBody}
                />
                {(errors.vin || errors.body) && (
                  <span className="text-small text-special-red">
                    Поле не должно быть пустым.
                  </span>
                )}
              </div>
            </div>
          </div>
        </ApplicationCheckTitle>
      </>
    );
  },
);

const AsyncSelectBrand = ({
  list,
  isFetchingBrands,
  handleGetModelsOfBrand,
}: {
  list: VehicleBrandType[];
  isFetchingBrands: boolean;
  handleGetModelsOfBrand: (val: SingleValue<VehicleBrandTypeWithLabel>) => void;
}) => {
  const { listWithLabel, listOptions } = replaceNameWithLabel(list);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={listWithLabel}
      placeholder={false}
      loadOptions={listOptions}
      isDisabled={isFetchingBrands}
      onChange={handleGetModelsOfBrand}
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

const AsyncSelectModel = ({
  isFetchingModels,
  list,
  model,
  setModel,
}: {
  isFetchingModels: boolean;
  list: VehicleBrandType[];
  model: string | VehicleBrandTypeWithLabel;
  setModel: (val: SingleValue<string | VehicleBrandTypeWithLabel>) => void;
}) => {
  const { listWithLabel, listOptions } = replaceNameWithLabel(list);

  const handleSetModel = (
    val: SingleValue<string | VehicleBrandTypeWithLabel>,
  ) => {
    setModel(val);
  };

  return (
    <AsyncSelect
      cacheOptions
      placeholder={false}
      defaultOptions={listWithLabel}
      loadOptions={listOptions}
      isDisabled={isFetchingModels}
      value={model}
      onChange={handleSetModel}
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

export default ApplicationVehicle;
