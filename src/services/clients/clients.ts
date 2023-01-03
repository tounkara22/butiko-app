import { Client, ClientSummary } from "../../types/clients/clients";
import { apiHelper } from "../apiHelper/apiHelper";
import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";
import { endpoints } from "../endpoints";
import { getClientDetailPayload } from "./payloads";
import {
  ApiMethod,
  ClientContactRequestType,
  ClientOverviewRequestType,
  ClientRequestType,
} from "./type";

const {
  fetchAllClients,
  addNewClient: addNewClientUrl,
  getClientOverviewUrl,
  getClientContactsUrl,
  getClientTransactionsUrl,
} = endpoints;

export const getClients: () => Promise<
  ResponseType<ClientSummary[]>
> = async () => {
  return apiHelper(fetchAllClients, ApiMethod.POST, {
    userid: "63ac649dbf8cbfc0fb15070c",
  });
};

export const addNewClient = (payload: Client) => {
  return apiHelper(addNewClientUrl, ApiMethod.POST, payload);
};

export const getClientOverview: ClientOverviewRequestType = async (clientId) =>
  apiHelper(
    getClientOverviewUrl,
    ApiMethod.POST,
    getClientDetailPayload(clientId)
  );

export const getClientTransactions: ClientRequestType = async (clientId) => {
  return apiHelper(
    getClientTransactionsUrl,
    ApiMethod.POST,
    getClientDetailPayload(clientId)
  );
};

export const getClientContacts: ClientContactRequestType = async (clientId) => {
  return apiHelper(
    getClientContactsUrl,
    ApiMethod.POST,
    getClientDetailPayload(clientId)
  );
};
