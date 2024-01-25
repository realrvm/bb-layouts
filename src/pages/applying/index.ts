import { lazy } from "react";

const ApplyingSum = lazy(() => import("./ui/applying-sum/ApplyingSum"));
const Applying = lazy(() => import("./ui/Applying"));

export { ApplyingAuto } from "./ui/applying-auto/ApplyingAuto";
export { ApplyingDocs } from "./ui/applying-docs/ApplyingDocs";
export { ApplyingResult } from "./ui/applying-result/ApplyingResult";

export { ApplyingSum, Applying };

export { useGetLoans, usePostLoan } from "./model/api/loans";
export { useGetVehiclesList } from "./model/api/vehicles";
