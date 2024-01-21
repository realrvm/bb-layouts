import { Paths } from "@/shared/lib/types";

export type UserAccessSchema = {
  accessToken: string;
  targetPath?: Paths;
};

export type TargetPathSchema = {
  targetPath?: Paths;
};
