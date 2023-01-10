import { ILoginVar, ISignupVar } from "../types/auth";

const textFieldInit = {
  value: "",
  isValid: false,
  error: "",
};

export const loginInit: ILoginVar = {
  email: textFieldInit,
  password: textFieldInit,
};

export const signupInit: ISignupVar = {
  firstName: textFieldInit,
  lastName: textFieldInit,
  email: textFieldInit,
  password: textFieldInit,
  passwordConfirm: textFieldInit,
  dob: textFieldInit,
};
