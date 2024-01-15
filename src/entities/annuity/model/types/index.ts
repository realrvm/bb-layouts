import { Months } from "@/shared/lib/types";

export type AnnuitySchema = {
  sum: string;
  period: Months;
};

export type AnnuityRateSchema = {
  value: number;
};

export type AnnuityApprovalSchema = {
  help_text: string;
  value: number;
};
