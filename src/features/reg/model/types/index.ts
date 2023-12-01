export type RegSchema = {
  phone_number: string;
  password: string;
  isLoading: boolean;
  error?: string;
};

export enum RegValidateErrors {
  INCORRECT_USER_DATA = "incorrect user data",
  NO_USER_FOUND = "no user found",
  NO_DATA = "no data",
  SERVER_ERROR = "server error",
}
