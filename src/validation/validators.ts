import { signupVar } from "../apollo-client/globalVars";
import { IValidatorRule } from "./types";

export const validateRequired = ({ value }: IValidatorRule) => {
  if (value != null) {
    if (typeof value === "string" && !value.trim()) return false;
    if (Array.isArray(value) && !value.length) return false;
    return true;
  }
  return false;
};

export const validateRegex = ({ regExp, value }: IValidatorRule) => {
  if (!regExp || !value) return false;
  return regExp.test(value as string);
};

/**
 * Given a value and a maxLength, validator ensures that
 * the value is less than or equal to the max length
 */
export const validateMaxLength = ({ value, args: maxLength }: IValidatorRule) => {
  return (value as string).length <= (maxLength as number);
};

/**
 * Given a value and a minLength, validator ensures that
 * the value is bigger than or equal to the max length
 */
export const validateMinLength = ({ value, args: minLength }: IValidatorRule) => {
  return (value as string).length >= (minLength as number);
};

export const validateDateLessThan = ({ args: maxNumYears, value }: IValidatorRule) => {
  const currDate = new Date();
  const maxYear = currDate.getFullYear() - (maxNumYears as number);
  const maxDate = new Date(maxYear, currDate.getMonth(), currDate.getDate());
  const targetDate = new Date(value as string);
  return targetDate >= maxDate;
};

export const validateDateBiggerThan = ({ args: minNumYears, value }: IValidatorRule) => {
  const currDate = new Date();
  const minYear = currDate.getFullYear() - (minNumYears as number);
  const minDate = new Date(minYear, currDate.getMonth(), currDate.getDate());
  const targetDate = new Date(value as string);
  return targetDate <= minDate;
};

export const validateDateBetweenRange = ({ args: rangeString, value }: IValidatorRule) => {
  const [minNumYears, maxNumYears] = (rangeString as string)?.split("-");
  const currDate = new Date();

  const minYear = currDate.getFullYear() - parseInt(maxNumYears);
  const minDate = new Date(minYear, currDate.getMonth(), currDate.getDate());

  const maxYear = currDate.getFullYear() - parseInt(minNumYears);
  const maxDate = new Date(maxYear, currDate.getMonth(), currDate.getDate());
  const targetDate = new Date(value as string);
  return targetDate >= minDate && targetDate <= maxDate;
};

export const validateEqualValues = ({ args, value }: IValidatorRule) => {
  const val = value as string;
  const [field, form] = (args as string).split(".");

  if (form === "signup") {
    const match = signupVar()[field as "password" | "passwordConfirm"].value;
    if (match != null && val != null && val.length > 0 && match.length > 0) {
      return match === val;
    }
  }

  return true;
};
