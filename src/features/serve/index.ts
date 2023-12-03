export type { RegSchema } from "./model/types";

export { regReducer, regActions } from "./model/slice/regSlice";
export { loginReducer, loginActions } from "./model/slice/loginSlice";

export { login } from "./model/api/login";
export { register } from "./model/api/register";
