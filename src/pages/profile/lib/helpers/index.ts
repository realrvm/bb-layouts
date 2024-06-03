import { ApplicationStatus } from "@/shared/lib/enums";

export function setAgreementsTitle(agreementType: "deposit" | "loan") {
  switch (agreementType) {
    case "deposit":
      return "Документ залога";
    case "loan":
      return "Документ микрозайма";
    default:
      return "";
  }
}

export function navigateByApplicationStatus(
  status: ApplicationStatus,
  id: number,
): string {
  switch (status) {
    case ApplicationStatus.REFUSED:
      return `/profile/main/${id}/refused`;
    case ApplicationStatus.APPROVED:
    case ApplicationStatus.DATA_CHECK:
    case ApplicationStatus.AGENT_WORK:
      return `/profile/main/${id}/schedule`;
    case ApplicationStatus.CAR_EVALUATED:
      return `/profile/main/${id}/considered`;
    case ApplicationStatus.ACTIVE:
      return "/profile/active";
    case ApplicationStatus.LOAN_SUM_SELECTED:
      return "/application/vehicle";
    case ApplicationStatus.CAR_DATA_SELECTED:
      return "/application/docs";
    default:
      return `/application/calculator`;
  }
}
