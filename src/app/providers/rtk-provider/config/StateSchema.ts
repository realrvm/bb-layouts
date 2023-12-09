// schemes
import { AxiosInstance } from "axios";

import { HRSchema } from "@/widgets/navbar";
import { PhoneSchema } from "@/entities/phone";
import { UserAccessSchema } from "@/entities/user";
import { RegSchema } from "@/features/serve";

export type StateSchema = {
  hr: HRSchema;
  phone: PhoneSchema;
  reg: RegSchema;
  login: RegSchema;
  access: UserAccessSchema;
};

export type ThunkExtraArgument = {
  api: AxiosInstance;
  api_reg: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArgument;
};
