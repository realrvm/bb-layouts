import { RegSchema, RegValidateErrors } from "../types";

type AuthData = Pick<RegSchema, "phone_number" | "password">;

export const validate = (authData: AuthData) => {
  const { password, phone_number } = authData;

  const errors: RegValidateErrors[] = [];

  if (!authData) {
    errors.push(RegValidateErrors.NO_DATA);
  }

  if (!phone_number || !password) {
    errors.push(RegValidateErrors.INCORRECT_USER_DATA);
  }

  return errors;
};
