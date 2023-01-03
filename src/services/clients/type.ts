import {
  Client,
  ClientContact,
  IClientOverview,
} from "../../types/clients/clients";
import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";

export enum ApiMethod {
  POST = "POST",
  GET = "GET",
}

export type ClientOverviewRequestType = (
  clientId: string
) => Promise<ResponseType<IClientOverview>>;

export type ClientRequestType = (
  clientId: string
) => Promise<ResponseType<Client>>;

export interface IClientContact {
  displayName: string;
  id: string;
  contacts: ClientContact[];
}

export type ClientContactRequestType = (
  clientId: string
) => Promise<ResponseType<IClientContact>>;
