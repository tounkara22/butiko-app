import { EventHandlerProps } from "../../validation/types";
import { validateAllFields, validateField } from "../../validation/utils";
import { getModelFieldValue, updateDataModel } from "../../validation/utils";
import { IValidatorResult } from "../../validation/types";
import { passwordMatchValidation } from "./validation";
import { passwordFieldNames } from "../../../constants/auth";

export const authChangeHandler = ({
  model,
  fieldName,
  value: fieldValue,
  validate = true,
  regex,
  validationObject, // made any on purpose
  dependent,
}: EventHandlerProps): IValidatorResult | void => {
  let value = fieldValue;
  const name = fieldName;
  const currentValue = model()[name].value;

  if (regex) {
    const valueTest = value as string;

    if (regex.test(valueTest)) {
      updateDataModel(model, {
        [name]: getModelFieldValue(model, name, value != null ? value : currentValue),
      });
    } else {
      updateDataModel(model, {
        [name]: getModelFieldValue(model, name, currentValue ? currentValue : ""),
      });
    }
  } else {
    updateDataModel(model, {
      [name]: getModelFieldValue(model, name, value != null ? value : currentValue),
    });
  }

  if (validate && validationObject[name]) {
    const isValid = validateField(name, model, validationObject[name].validators);

    if (!isValid && dependent) {
      validateAllFields(passwordFieldNames, model, passwordMatchValidation);
    }
    return isValid;
  }
};
