export interface ICommonTextField {
  value: string;
  isValid: boolean;
  error: string;
}

export interface ICommonDateField extends Omit<ICommonTextField, "value"> {
  value: Date;
}
