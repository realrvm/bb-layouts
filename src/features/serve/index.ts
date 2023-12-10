export type { RegSchema } from "./model/types";

export { regReducer, regActions } from "./model/slice/regSlice";
export { obtainReducer, obtainActions } from "./model/slice/obtainSlice";

export { obtain } from "./model/api/obtain";
export { register } from "./model/api/register";
export { get } from "./model/api/get";
