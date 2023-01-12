import { SignupFormField } from "../src/components/auth/types";

interface GenericObject {
  [key: string]: string;
}

export const authErrors: GenericObject = {
  GENERIC: "all.errors.generic",
  USER_ALREADY_EXIST: "all.errors.USER_ALREADY_EXIST",
  EMAIL_INVALID: "all.errors.EMAIL_INVALID",
  PASSWORD_INCORRECT: "all.errors.PASSWORD_INCORRECT",
  EMAIL_NOT_FOUND: "all.errors.EMAIL_NOT_FOUND",
  USER_ALREADY_VERIFIED: "all.errors.USER_ALREADY_VERIFIED",
  USER_CANNOT_BE_VERIFIED: "all.errors.USER_CANNOT_BE_VERIFIED",
};

export const authSuccess: GenericObject = {
  SIGNUP_COMPLETE: "page.signup.snackbar.success",
  EMAIL_NOT_VERIFIED: "page.signup.snackbar.success",
};

export const activateAccountMessages: GenericObject = {
  SUCCESS: "page.activate.snackbar.success",
  USER_ALREADY_VERIFIED: "all.errors.USER_ALREADY_VERIFIED",
  USER_CANNOT_BE_VERIFIED: "all.errors.USER_CANNOT_BE_VERIFIED",
};

export const signupFieldNames: SignupFormField[] = [
  "firstName",
  "lastName",
  "dob",
  "passwordConfirm",
  "email",
  "password",
];

export const passwordFieldNames = ["password", "passwordConfirm"];
