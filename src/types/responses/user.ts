import { IBusiness } from "../../apollo-client/types/user";

export interface IUserResponse {
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  businesses: IBusiness[];
}
