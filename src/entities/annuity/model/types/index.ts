export type AnnuitySchema = {
  sum: string;
  period: "24" | "36" | "48" | "60";
};

export type AnnuityRateSchema = {
  value: number;
};

export type AnnuityApprovalSchema = {
  help_text: string;
  value: number;
};
