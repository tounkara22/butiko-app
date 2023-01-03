import {
  ClientTransactionsResponse,
  ClientOverviewResponse,
  getClientsResponse,
  ClientContactsResponse,
  ClientOverviewData,
  AllClientsData,
} from "../../src/services/clients/mockResponse";
import { endpoints } from "../../src/services/endpoints";

const {
  fetchAllClients,
  getClientOverviewUrl,
  getClientTransactionsUrl,
  getClientContactsUrl,
} = endpoints;

const createMockResponse = (path: string, params: any, query: any) => {
  if (path === fetchAllClients) {
    return AllClientsData;
  }
  if (path === getClientOverviewUrl) {
    return ClientOverviewData;
  }
  if (path === getClientTransactionsUrl) {
    return ClientTransactionsResponse;
  }

  if (path === getClientContactsUrl) {
    return ClientContactsResponse;
  }
  return {};
};

export default function handler(req: any, res: any) {
  const { slug } = req.query;
  const path = slug.join("/");
  const params = req.body;
  const response = createMockResponse("/api/" + path, params, req.query);
  res.status(200).json(response);
}
