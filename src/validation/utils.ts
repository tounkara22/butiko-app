import { ApolloModelVars } from "../apollo-client/types/models";
import { IValidator } from "./types";
import { IValidatorResult } from "./types";

export const updateDataModel = (dataModel: any, obj: any) => {
  dataModel({
    ...dataModel(),
    ...obj,
  });
};

export const getModelFieldValue = (model: any, name: string, value: any) => {
  return { ...model()[name], value };
};

/**
 * Runs validation for the field and returns an object with the proper error
 */
export const validateField = (
  fieldName: string,
  model: ApolloModelVars,
  validators: IValidator[]
) => {
  if (validators?.length) {
    for (const validator of validators) {
      const value = model()[fieldName].value;

      const isValid = validator.rule({
        value,
        name: fieldName,
        regExp: validator.regExp,
        args: validator.args,
      });

      const validatorObject: IValidatorResult = {
        isValid,
        error: "",
      };

      if (!isValid) {
        validatorObject.error = validator.error;
      }
      updateDataModel(model, {
        [fieldName]: {
          ...model()[fieldName],
          ...validatorObject,
        },
      });

      if (!isValid) {
        return validatorObject;
      }
    }
  }
};

export const validateAllFields = (
  fieldNames: string[],
  model: ApolloModelVars,
  validationObject: any
) => {
  let isAllValid = true;
  for (let fieldName of fieldNames) {
    const validators = validationObject[fieldName].validators;
    const result = validateField(fieldName, model, validators);

    if (result != null && !result.isValid) {
      isAllValid = false;
    }
  }
  return isAllValid;
};
