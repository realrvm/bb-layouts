// schemes
import { AxiosInstance } from "axios";

import { HRSchema } from "@/widgets/navbar";
import { PhoneSchema } from "@/entities/phone";
import { UserAccessSchema } from "@/entities/user";
import { RegSchema } from "@/features/serve";
import { $api_query } from "@/shared/api";

export type StateSchema = {
  hr: HRSchema;
  phone: PhoneSchema;
  reg: RegSchema;
  obtain: RegSchema;
  access: UserAccessSchema;
  [$api_query.reducerPath]: ReturnType<typeof $api_query.reducer>;
};

export type ThunkExtraArgument = {
  api: AxiosInstance;
  api_reg: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArgument;
};
