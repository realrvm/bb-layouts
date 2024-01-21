import { lazy } from "react";

const ApplyingSum = lazy(() => import("./ui/applying-sum/ApplyingSum"));
const Applying = lazy(() => import("./ui/Applying"));

export { ApplyingAuto } from "./ui/applying-auto/ApplyingAuto";
export { ApplyingDocs } from "./ui/applying-docs/ApplyingDocs";
export { ApplyingResult } from "./ui/applying-result/ApplyingResult";

export { ApplyingSum, Applying };

export { useGetLoans } from "./model/api/loans";
