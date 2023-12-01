// schemes
import { AxiosInstance } from "axios";

import { HRSchema } from "@/widgets/navbar";
import { PhoneSchema } from "@/entities/phone";
import { RegSchema } from "@/features/reg";

export type StateSchema = {
  hr: HRSchema;
  phone: PhoneSchema;
  reg: RegSchema;
};

export type ThunkExtraArgument = {
  api: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArgument;
};
