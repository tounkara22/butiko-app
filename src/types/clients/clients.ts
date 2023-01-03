import { IAddress } from "../location";

export interface ClientSummary {
  displayName: string;
  id: string;
  lastUpdate?: string;
  outstandingBalance: string;
}

export interface Client {
  displayName: string;
  id: string;
  contacts?: ClientContact[];
  dateAdded?: string;
  primaryContact?: string;
}

export interface ClientSnapshot {
  displayName: string;
  id: string;
  imageUrl?: string;
  address?: IAddress;
  phoneNumber?: string;
  email?: string;
  primaryContactId?: string;
}

export interface TransactionShort {
  txId: string;
  itemId: string;
  item: string;
  totalCost: string;
  totalReceived: string;
  txDate: string;
  lastUpdate: string;
}

interface InvoiceShort {
  invoiceId: string;
  createdOn: string;
  numItems: number;
  totalCost: string;
  lastUpdate: string;
}

/** snapshot of most important information about client */
export interface IClientOverview {
  clientSnapshot: ClientSnapshot;
  transactions: {
    totalReceived: string;
    totalCost: string;
    lastTxDate: string;
    outstandingTx: TransactionShort[];
  };
  invoices: InvoiceShort[];
}

export interface ClientContact {
  id?: string;
  address?: IAddress;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  imageUrl?: string;
}

export type ClientTabType = "CLIENT_TRANSACTIONS" | "CLIENT_OVERVIEW";
// | "CLIENT_CONTACTS";
