import { RegSchema, RegValidateErrors } from "../types";

type AuthData = Pick<RegSchema, "phone_number">;

export const validateReg = (authData: AuthData) => {
  const { phone_number } = authData;

  const errors: RegValidateErrors[] = [];

  if (!authData) {
    errors.push(RegValidateErrors.NO_DATA);
  }

  if (!phone_number) {
    errors.push(RegValidateErrors.INCORRECT_USER_DATA);
  }

  return errors;
};
