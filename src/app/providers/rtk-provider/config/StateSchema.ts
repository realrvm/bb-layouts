// schemes
import { PhoneSchema } from "@/entities/phone";
import { UserAccessSchema } from "@/entities/user";
import { AnnuitySchema } from "entities/annuity";
import { $api_query } from "@/shared/api";
import { TargetPathSchema } from "@/entities/user/model/types";

export type StateSchema = {
  phone: PhoneSchema;
  access: UserAccessSchema;
  annuity: AnnuitySchema;
  targetPath: TargetPathSchema;
  [$api_query.reducerPath]: ReturnType<typeof $api_query.reducer>;
};
