// schemes
import { PhoneSchema } from "@/entities/phone";
import { UserAccessSchema } from "@/entities/user";
import { AnnuitySchema } from "entities/annuity";
import { $api_query } from "@/shared/api";

export type StateSchema = {
  phone: PhoneSchema;
  access: UserAccessSchema;
  annuity: AnnuitySchema;
  [$api_query.reducerPath]: ReturnType<typeof $api_query.reducer>;
};
