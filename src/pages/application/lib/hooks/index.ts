import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";

import { ApplicationPages, Months } from "@/shared/lib/types";
import { calcLoanCredit, getOnlyDigits } from "@/widgets/calculator/lib/utils";
import { useExpectedPostLoan, useLastLoan } from "@/entities/loan";
import {
  POLLING_INTERVAL,
  STORAGE,
  STORAGE_EXPECTED,
} from "@/shared/lib/constants";
import { ReportsRetrieveSchema } from "../../model/types";
import {
  useGetRetrievedReport,
  useInitiateReport,
} from "../../model/api/reportsApi";
import { isPlateTheRequiredLength } from "../utils";
import {
  useGetBrands,
  useGetModel,
  useGetPresign,
} from "../../model/api/vehiclesApi";
import {
  FormType,
  VehicleBrandType,
  VehicleBrandTypeWithLabel,
} from "../types";
import { initialForm } from "../../constants";
import { checkFileSize } from "@/shared/lib/helpers/checkFileSize";
import { ZodError } from "zod";

const pagesApplication: ApplicationPages[] = ["calculator", "vehicle", "docs"];
const profilePages: string[] = ["schedule", "approved", "payout"];

export function useLocationIndex(paths = "application") {
  const pages = paths === "profile" ? profilePages : pagesApplication;

  const location = useLocation();

  const path = location.pathname.split("/").pop();

  const locationIndex = pages.findIndex((el) => el === path) + 1;

  return { locationIndex };
}

export function useApplicationCalculator(
  rangeValue: number,
  activeTerm: Months,
) {
  const navigate = useNavigate();
  const [postExpectedLoan, { isLoading }] = useExpectedPostLoan();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const value = calcLoanCredit(rangeValue);

    STORAGE.removeItem(STORAGE_EXPECTED);

    try {
      await postExpectedLoan({
        expected_sum: getOnlyDigits(value),
        expected_term: activeTerm,
      }).unwrap();

      navigate("/application/vehicle");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return { handleSubmit, isLoading };
}

export function useGetAutoData(
  plate: string,
  region: string,
  setModal: any,
  setErrors: (e: FormType) => void,
) {
  const [pollingInterval, setPollingInterval] = useState(POLLING_INTERVAL);
  const [autoData, setAutoData] = useState<ReportsRetrieveSchema | undefined>();

  const [
    initiateReport,
    {
      data,
      isFetching: isFetchingInitiateReport,
      isSuccess: isSuccessInitiateReport,
      isError: isErrorInitiateReport,
    },
  ] = useInitiateReport();

  const [
    getRetrievedReport,
    {
      data: dataAuto,
      isFetching: isFetchingRetrievedReport,
      isSuccess: isSuccessRetrievedReport,
      isError: isErrorRetrievedReport,
    },
  ] = useGetRetrievedReport({ pollingInterval });

  useEffect(() => {
    async function fetchAutoData() {
      if (isSuccessInitiateReport && data?.uid) {
        const res = await getRetrievedReport({ id: data?.uid || "" }).unwrap();
        setAutoData(res);
      }
    }

    fetchAutoData();
  }, [data?.uid, isSuccessInitiateReport, getRetrievedReport]);

  useEffect(() => {
    isSuccessRetrievedReport && setPollingInterval(0);
  }, [dataAuto?.uid, isSuccessRetrievedReport]);

  const handleInitiateReport = () => {
    setModal("");
    setErrors(initialForm);
    !!pollingInterval && setPollingInterval(POLLING_INTERVAL);

    isPlateTheRequiredLength(plate, region) &&
      initiateReport({ plate: plate + region });
  };

  const isLoading = isFetchingInitiateReport || isFetchingRetrievedReport;
  const isError = isErrorInitiateReport || isErrorRetrievedReport;

  return {
    handleInitiateReport,
    autoData,
    isLoading,
    isError,
    isSuccessRetrievedReport,
  };
}

const usePresign = () => {
  const {data: lastLoan} = useLastLoan()
  const [getPresign] = useGetPresign();

  // params : files: FileList -старое значние
  async function upload(file: File) {
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //
    //   await getPresign({
    //     body: file,
    //     uid: vehicleUid?.id,
    //   }).unwrap();
    // }
    try {
      await getPresign({
        body: file,
        uid: lastLoan?.vehicle || 1,
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  }

  return { upload };
};

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [errors, setErrors] = useState<string | undefined>();

  const schema = checkFileSize();

  const { upload } = usePresign();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      try {
        schema.parse({ file });

        setUploadedFile(file as File);
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
          setPreviewImage(fileReader.result);
          if (targetFiles) upload(targetFiles[0]);
        });

        if (file) fileReader.readAsDataURL(file);

        setErrors(undefined);
      } catch (error) {
        if (error instanceof ZodError) {
          setPreviewImage(null);

          setErrors(error.errors[0].message);
        }
      }
    },
    [upload, schema],
  );

  const handleRemoveChosenImage: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setUploadedFile(undefined);
      setErrors(undefined);
      setPreviewImage(null);
    }, []);

  return {
    previewImage,
    handleSelectImage,
    handleRemoveChosenImage,
    errors,
    uploadedFile,
  };
};

export function useGetBrandModel(setBrand: any, setModel: any) {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [brandsList, setBrandsList] = useState<VehicleBrandType[]>([]);
  const [getBrandsList, { isFetching: isFetchingBrands }] = useGetBrands();
  const [getModel, { isFetching: isFetchingModel }] = useGetModel();

  const isFetching = isFetchingBrands || isFetchingModel;

  useEffect(() => {
    async function fetchBrandsList() {
      try {
        const brands = await getBrandsList().unwrap();
        setBrandsList(brands?.results);
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }

    fetchBrandsList();
  }, [getBrandsList]);

  const handleGetModelsOfBrand = (
    brandId: SingleValue<VehicleBrandTypeWithLabel>,
  ) => {
    async function fetchModel() {
      try {
        if (brandId) {
          setModel("");
          setBrand(brandId);
          const { results } = await getModel(brandId.id).unwrap();
          setVehiclesList(results);
        }
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    }

    fetchModel();
  };

  return { isFetching, brandsList, vehiclesList, handleGetModelsOfBrand };
}

export function useManufactureYear() {
  const [manufactureYear, setManufactureYear] = useState("");

  const handleManufactureYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, maxLength } = e.target;

    const yearOnlyDigits = value.replace(/\D/g, "").slice(0, maxLength);
    setManufactureYear(yearOnlyDigits);
  };

  return { manufactureYear, handleManufactureYear };
}

export function useVinBody() {
  const [vinBody, setVinBody] = useState("");

  const handleVinBody: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setVinBody(value);
  };

  return { vinBody, handleVinBody };
}
