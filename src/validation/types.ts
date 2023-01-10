import { ApolloModelVars } from "../apollo-client/types/models";
import {
  ILoginValidation,
  ISignupValidation,
  LoginFormField,
  SignupFormField,
} from "../components/auth/types";

/**
 * Each validator provides a rule. This defines the arguments of that rule
 */
export interface IValidatorRule {
  name?: string;
  value?: string | number | boolean | string[];
  regExp?: RegExp;
  args?: string | number;
}

/**
 * Handles a single validator log by defining `rule` function, the copy of the error code to show,
 * the regex used to check a match and any extra argument used to run rule
 */
export interface IValidator {
  rule: (IValidatorRule: IValidatorRule) => boolean;
  error: string;
  regExp?: RegExp;
  args?: string | number;
}

/**
 * Provides definitions for what a field will use as part of validations
 */
export interface IValidatedField {
  validators: IValidator[];
  fieldDependentValidators?: IValidator[];
}

/**
 * Event handler props for fields needing validation
 */
export interface EventHandlerProps {
  model: ApolloModelVars;
  fieldName: LoginFormField | SignupFormField | string;
  value?: string | boolean | number | string[];
  validate?: boolean;
  regex?: RegExp;
  validationObject: any;
}

/**
 * Displays the result object after validation
 */
export interface IValidatorResult {
  isValid: boolean;
  error?: string;
}
