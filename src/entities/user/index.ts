export type { UserAccessSchema } from "./model/types";

export {
  userAccessReducer,
  userAccessActions,
  getUserAccess,
} from "./model/slice/userAccessSlice";

export {
  targetPathReducer,
  targetPathActions,
  getTargetPath,
} from "./model/slice/targetPathSlice";
