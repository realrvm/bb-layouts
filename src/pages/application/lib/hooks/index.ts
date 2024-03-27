import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";

import { ApplicationPages, Months } from "@/shared/lib/types";
import { calcLoanCredit, getOnlyDigits } from "@/widgets/calculator/lib/utils";
import { useActionCreators } from "@/app/providers/rtk";
import { loanActions, usePostLoan } from "@/entities/loan";
import { POLLING_INTERVAL } from "@/shared/lib/constants";
import { ReportsRetrieveSchema } from "../../model/types";
import {
  useGetRetrievedReport,
  useInitiateReport,
} from "../../model/api/reportsApi";
import { isPlateTheRequiredLength } from "../utils";
import {
  useCreateModel,
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

export function useLocationIndex() {
  const pages: ApplicationPages[] = ["calculator", "vehicle", "docs"];

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
  const loanAction = useActionCreators(loanActions);
  const [postLoan, { isLoading }] = usePostLoan();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const value = calcLoanCredit(rangeValue);

    const sum = Number(getOnlyDigits(value));

    loanAction.setLoan({ term: activeTerm, sum });

    try {
      await postLoan({ term: activeTerm, sum }).unwrap();

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
  const [, { data: vehicleUid }] = useCreateModel({
    fixedCacheKey: "shared-create-model-post",
  });
  const [getPresign] = useGetPresign();

  function upload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      retrieveNewURL(file, (file: File, url: string) => {
        uploadFile(file, url);
      });
    }
  }

  async function retrieveNewURL(
    file: File,
    cb: (file: File, url: string) => void,
  ) {
    try {
      if (vehicleUid) {
        const res = await getPresign({
          uid: vehicleUid.id.toString(),
          file_name: file.name,
        }).unwrap();

        if (res) cb(file, res.url);
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async function uploadFile(file: File, url: string) {
    try {
      await fetch(url, { method: "PUT", body: file });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  return { upload };
};

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const { upload } = usePresign();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
        if (targetFiles) upload(targetFiles);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [upload],
  );

  return { previewImage, handleSelectImage };
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
