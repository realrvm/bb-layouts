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
