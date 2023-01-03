import { LoginForm } from "../types/auth";

export const loginInit: LoginForm = {
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
