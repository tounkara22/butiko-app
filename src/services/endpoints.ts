import local from "./local";
import prod from "./prod";

let env: { [key: string]: string };

switch (process.env.NEXT_PUBLIC_ENV) {
  case "production":
    env = prod;
    break;
  default:
    env = local;
    break;
}

export const endpoints = {
  baseUrl: env.baseUrl,
  loginUrl: `${env.baseUrl}${env.loginUrl}`,
  signupUrl: `${env.baseUrl}${env.signupUrl}`,
  activateUrl: `${env.baseUrl}${env.activateUrl}`,
  fetchUserUrl: `${env.baseUrl}${env.fetchUserUrl}`,
  fetchAllClients: `${env.baseUrl}${env.fetchAllClients}`,
  addNewClient: `${env.baseUrl}${env.addNewClient}`,
  getClientOverviewUrl: `${env.baseUrl}${env.getClientOverviewUrl}`,
  getClientTransactionsUrl: `${env.baseUrl}${env.getClientTransactionsUrl}`,
  getClientContactsUrl: `${env.baseUrl}${env.getClientContactsUrl}`,
};
