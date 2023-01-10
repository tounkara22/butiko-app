import { IValidatedField } from "../../validation/types";

export interface ILoginValidation {
  email: IValidatedField;
  password: IValidatedField;
}

export interface ISignupValidation {
  firstName: IValidatedField;
  lastName: IValidatedField;
  dob: IValidatedField;
  email: IValidatedField;
  password: IValidatedField;
  passwordConfirm: IValidatedField;
}

export type SignupFormField =
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "dob"
  | "passwordConfirm"
  | "email"
  | "password";

export type LoginFormField = "email" | "password";
