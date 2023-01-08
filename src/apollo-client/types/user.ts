export interface IBusiness {
  id: string;
  name: string;
}

export interface IUserVar {
  id: string;
  currentProfile?: string;
  firstName: string;
  lastName: string;
  email: string;
  businesses: IBusiness[];
}
