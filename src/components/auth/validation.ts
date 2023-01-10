import {
  validateDateBetweenRange,
  validateDateBiggerThan,
  validateDateLessThan,
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
        regExp:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
        error: "page.login.form.textfield.password.error.invalid",
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
        args: "100",
      },
      {
        rule: validateDateBiggerThan,
        error: "page.signup.form.textfield.dob.tooSmall",
        args: "18",
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
  passwordConfirm: {
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
        regExp:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    ],
  },
  password: {
    validators: [
      {
        rule: validateRequired,
        error: "page.signup.header.required.error",
      },
    ],
  },
};
