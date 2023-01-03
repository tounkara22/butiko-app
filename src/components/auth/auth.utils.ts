import { EventHandlerProps } from "../../validation/types";
import { validateField } from "../../validation/utils";
import { getModelFieldValue, updateDataModel } from "../../validation/utils";
import { IValidatorResult } from "../../validation/types";
import { LoginValidations } from "./auth.validation";

export const loginChangeHandler = ({
  model,
  fieldName,
  value: fieldValue,
  validate = true,
  regex,
}: EventHandlerProps): IValidatorResult | void => {
  let value = fieldValue;
  const name = fieldName as "email" | "password";
  const currentValue = model()[name].value;

  if (regex) {
    const valueTest = value as string;

    if (regex.test(valueTest)) {
      updateDataModel(model, {
        [name]: getModelFieldValue(
          model,
          name,
          value != null ? value : currentValue
        ),
      });
    } else {
      updateDataModel(model, {
        [name]: getModelFieldValue(
          model,
          name,
          currentValue ? currentValue : ""
        ),
      });
    }
  } else {
    updateDataModel(model, {
      [name]: getModelFieldValue(
        model,
        name,
        value != null ? value : currentValue
      ),
    });
  }

  if (validate && LoginValidations[name]) {
    return validateField(name, model, LoginValidations[name].validators);
  }
};
