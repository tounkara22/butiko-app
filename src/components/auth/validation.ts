import { emailRegex } from "../../../utils/reg-exp";
import { signupVar } from "../../apollo-client/globalVars";
import { IValidator } from "../../validation/types";
import {
  validateDateBetweenRange,
  validateDateBiggerThan,
  validateDateLessThan,
  validateEqualValues,
  validateMinLength,
  validateRegex,
  validateRequired,
} from "../../validation/validators";
import { ILoginValidation, ISignupValidation } from "./types";

export const loginValidations: ILoginValidation = {
  email: {
    validators: [
      {
        rule: validateRequired,
        error: "page.login.form.textfield.email.error.required",
      },
      {
        rule: validateRegex,
        error: "page.login.form.textfield.email.error.invalid",
        regExp: emailRegex,
      },
    ],
  },
  password: {
    validators: [
      {
        rule: validateRequired,
        error: "page.login.form.textfield.password.error.required",
      },
      {
        rule: validateMinLength,
        error: "page.auth.common.error.password.length",
        args: 8,
      },
    ],
  },
};

export const signupValidations: ISignupValidation = {
  firstName: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
    ],
  },
  dob: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
      {
        rule: validateDateLessThan,
        error: "page.signup.form.textfield.dob.tooBig",
        args: 100,
      },
      {
        rule: validateDateBiggerThan,
        error: "page.signup.form.textfield.dob.tooSmall",
        args: 18,
      },
    ],
  },
  lastName: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
    ],
  },
  email: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
      {
        rule: validateRegex,
        error: "page.login.form.textfield.email.error.invalid",
        regExp: emailRegex,
      },
    ],
  },
  password: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
      {
        rule: validateMinLength,
        error: "page.auth.common.error.password.length",
        args: 8,
      },
    ],
  },
  passwordConfirm: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
      {
        rule: validateMinLength,
        error: "page.auth.common.error.password.length",
        args: 8,
      },
    ],
  },
};

export const equalPasswordsValidation: IValidator = {
  rule: validateEqualValues,
  error: "page.auth.common.error.password.match",
};

export const passwordMatchValidation = {
  password: {
    validators: [
      {
        rule: validateEqualValues,
        error: "page.auth.common.error.password.match",
        args: "passwordConfirm.signup",
      },
    ],
  },
  passwordConfirm: {
    validators: [
      {
        rule: validateEqualValues,
        error: "page.auth.common.error.password.match",
        args: "password.signup",
      },
    ],
  },
};
