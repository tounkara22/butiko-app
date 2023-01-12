import { ICommonTextField } from "./common";

export interface ILoginVar {
  email: ICommonTextField;
  password: ICommonTextField;
}

export interface ISignupVar {
  firstName: ICommonTextField;
  lastName: ICommonTextField;
  email: ICommonTextField;
  phoneNumber?: ICommonTextField;
  dob: ICommonTextField;
  password: ICommonTextField;
  passwordConfirm: ICommonTextField;
}
