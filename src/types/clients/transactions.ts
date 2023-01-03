export interface TransactionItem {
  id: string;
  category: string;
  name: string;
  description?: string;
  units: number;
  unitPrice: string;
}

/**
 * Generic representation of a single transaction
 */
export interface Transaction {
  id: string;
  type: "SALE" | "PURCHASE" | "EXCHANGE";
  startDate: string;
  endDate: string;
  amountDue: string;
  amountRemaining: string;
  currency: string;
  debitorId: string;
  debitedId: string;
  items: TransactionItem[];
}

/**
 * Represents the transactions between a user and a client
 */
export interface ClientTransaction {
  displayName: string;
  id: string;
  primaryContact: string;
  inProgress: Transaction[];
  completed: Transaction[];
  draft: Transaction[];
}
