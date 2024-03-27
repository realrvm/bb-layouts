import {
  CORRECT_PLATE_LENGTH,
  LONG_REGION_NUMBER,
  SHORT_REGION_NUMBER,
} from "@/shared/lib/constants";
import { VehicleBrandType, VehicleBrandTypeWithLabel } from "../types";

export function isPlateTheRequiredLength(
  plate: string,
  region: string,
): boolean {
  if (region === "00") {
    region = "";
  }

  return (
    plate.length === CORRECT_PLATE_LENGTH &&
    (region.length === SHORT_REGION_NUMBER ||
      region.length === LONG_REGION_NUMBER)
  );
}

export function replaceNameWithLabel(list: VehicleBrandType[]) {
  const listWithLabel = list.map((el) => ({
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

  return { listOptions, listWithLabel };
}
