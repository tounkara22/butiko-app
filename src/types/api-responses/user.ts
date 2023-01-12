import { IBusiness } from "../../apollo-client/types/user";

export interface IUserResponse {
  error?: string;
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  businesses: IBusiness[];
}
