export const enum Routes {
  MAIN = "/",
  AUTH = "auth",
  APPLICATION = "application",
  PROFILE = "profile",
  NOT_FOUND = "*",
}

export const enum TargetPages {
  PROFILE = `${Routes.PROFILE}/main`,
  APPLICATION_VEHICLE = `${Routes.APPLICATION}/vehicle`,
  APPLICATION_CALCULATOR = `${Routes.APPLICATION}/calculator`,
  AUTH = Routes.AUTH,
  INITIAL = "",
}

export const enum ButtonThemes {
  PRIMARY = "btn-primary",
  SECONDARY = "btn-secondary",
  SUCCESS = "btn-success",
  DANGER = "btn-danger",
  ICON_PRIMARY = "btn-icon-primary",
  ICON_SECONDARY = "btn-icon-secondary",
}

export const enum Widths {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

export const enum ServerErrors {
  WRONG_PHONE = "message is denied",
  WRONG_SMS = "No active account found with the given credentials",
}

export const enum ApplicationStatus {
  LOAN_SUM_SELECTED = "loan_sum_selected",
  CAR_DATA_SELECTED = "car_data_selected",
  CAR_EVALUATED = "car_evaluated",
  APPROVED = "approved",
  DATA_CHECK = "data_check",
  AGENT_WORK = "agent_work",
  ACTIVE = "active",
  REFUSED = "refused",
}
