import {
  validateMinLength,
  validateRegex,
  validateRequired,
} from "../../validation/validators";
import { ILoginValidation } from "./auth.types";

export const LoginValidations: ILoginValidation = {
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
