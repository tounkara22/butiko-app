export interface LoginPayload {
  [x: string]: any;
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
}

export interface ActivatePayload {
  id: string;
  token: string;
}
