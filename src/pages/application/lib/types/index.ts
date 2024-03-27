export type ApplicationAutoCheckProps = {
  autoData?: {
    vin: string | null;
    manufacture_year: number;
    model: { name: string };
    make: { name: string };
    body: string;
  };
  setIsManualInput: (val: boolean) => void;
};

export type VehicleBrandType = {
  id: string;
  name: string;
};

export type VehicleBrandTypeWithLabel = {
  id: string;
  label: string;
};

export type FormType = {
  model: number;
  body: string | null;
  vin: string | null;
  plate: string;
  manufacture_year: string;
};
