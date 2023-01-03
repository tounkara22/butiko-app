export interface ILoginVar {
  email: {
    value: string;
    isValid: boolean;
    error: string;
  };
  password: {
    value: string;
    isValid: boolean;
    error: string;
  };
}
