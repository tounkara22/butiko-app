import { IValidatedField } from "../../validation/types";

export interface ILoginValidation {
  email: IValidatedField;
  password: IValidatedField;
}
