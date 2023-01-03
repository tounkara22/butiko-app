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
export const validateMaxLength = ({
  value,
  args: maxLength,
}: IValidatorRule) => {
  return (value as string).length <= (maxLength as number);
};

/**
 * Given a value and a minLength, validator ensures that
 * the value is bigger than or equal to the max length
 */
export const validateMinLength = ({
  value,
  args: minLength,
}: IValidatorRule) => {
  return (value as string).length >= (minLength as number);
};
