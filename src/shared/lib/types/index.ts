export type Months = "24" | "36" | "48" | "60";

export const enum Paths {
  APPLYING_SUM = "/applying/applying_sum",
  APPLYING_AUTO = "/applying/applying_auto",
  PROFILE = "/account/account_all",
}

export const enum ServerErrors {
  WRONG_PHONE = "message is denied",
  WRONG_SMS = "No active account found with the given credentials",
}
