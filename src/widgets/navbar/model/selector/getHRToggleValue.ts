import { StateSchema } from "app/providers/StoreProvider";

export const getHRToggleValue = (state: StateSchema) => state.hr.isOpen;
