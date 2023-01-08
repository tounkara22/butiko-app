import { ILoginVar } from "../types/auth";

export const loginInit: ILoginVar = {
  email: {
    value: "",
    isValid: false,
    error: "",
  },
  password: {
    value: "",
    isValid: false,
    error: "",
  },
};
