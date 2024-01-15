// schemes
import { AxiosInstance } from "axios";

import { HRSchema } from "@/widgets/navbar";
import { PhoneSchema } from "@/entities/phone";
import { UserAccessSchema } from "@/entities/user";
import { RegSchema } from "@/features/serve";
import { AnnuitySchema } from "entities/annuity";
import { $api_query } from "@/shared/api";

export type StateSchema = {
  hr: HRSchema;
  phone: PhoneSchema;
  obtain: RegSchema;
  access: UserAccessSchema;
  annuity: AnnuitySchema;
  [$api_query.reducerPath]: ReturnType<typeof $api_query.reducer>;
};

export type ThunkExtraArgument = {
  api: AxiosInstance;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  extra: ThunkExtraArgument;
};
