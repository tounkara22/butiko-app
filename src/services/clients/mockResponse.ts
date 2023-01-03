import {
  Client,
  ClientSummary,
  IClientOverview,
} from "../../types/clients/clients";
import { ClientTransaction } from "../../types/clients/transactions";
import { IClientContact } from "./type";

export const AllClientsData: ClientSummary[] = [
  {
    displayName: "Modou Mbaye",
    id: "client-id-1",
    outstandingBalance: "-230000",
    lastUpdate: "1671731021094",
  },
  {
    displayName: "Aisha Samb",
    id: "client-id-2",
    outstandingBalance: "23000",
    lastUpdate: "1671500021094",
  },
  {
    displayName: "Coumba Diouf",
    id: "client-id-3",
    outstandingBalance: "-10000",
    lastUpdate: "1671700021094",
  },
  {
    displayName: "Jiba Ly",
    id: "client-id-4",
    outstandingBalance: "450",
    lastUpdate: "1671700021094",
  },
  {
    displayName: "Abdoulaye Kanté",
    id: "client-id-5",
    outstandingBalance: "-500",
    lastUpdate: "1671700021094",
  },
  {
    displayName: "Massamba Ka",
    id: "client-id-6",
    outstandingBalance: "10000",
    lastUpdate: "1671700021094",
  },
];

export const ClientOverviewData: IClientOverview = {
  clientSnapshot: {
    id: "123-Ibr-ahi-man-290",
    displayName: "Samba",
    address: {
      addressLine1: "291 Parcelles Assainies, Unité 11",
      city: "Dakar",
      country: "SEN",
    },
  },
  transactions: {
    totalReceived: "195000",
    totalCost: "250000",
    lastTxDate: "1671100016593",
    outstandingTx: [
      {
        itemId: "item-1",
        item: "Concrete Sococim",
        lastUpdate: "1671204016593",
        txDate: "1671100016593",
        totalReceived: "45000",
        totalCost: "100000",
        txId: "tx-1",
      },
      {
        itemId: "item-2",
        item: "Aluminum doors md",
        lastUpdate: "1671204016793",
        txDate: "1671100016593",
        totalReceived: "150000",
        totalCost: "150000",
        txId: "tx-1",
      },
    ],
  },
  invoices: [],
};

export const ClientOverviewResponse: Client = {
  displayName: "Samba",
  id: "123-Ibr-ahi-man-290",
  primaryContact: "pri-mar-yco-nta-ct1",
  contacts: [
    {
      id: "pri-mar-yco-nta-ct1",
      address: {
        addressLine1: "Parcelles Assainies, U.11",
        addressLine2: "Coté Hopital Mame Abdou Aziz  Dabakh",
        city: "Dakar",
        country: "Senegal",
        postalCode: "00000",
      },
      email: "primary@contact.com",
      firstName: "Albert",
      lastName: "Einstein",
      phoneNumber: "774657678",
      imageUrl:
        "https://images.pexels.com/photos/4559592/pexels-photo-4559592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
};

export const ClientTransactionsResponse: ClientTransaction = {
  displayName: "Einstein",
  id: "123-Ibr-ahi-man-290",
  primaryContact: "pri-mar-yco-nta-ct1",
  completed: [],
  inProgress: [],
  draft: [],
};

export const ClientContactsResponse: IClientContact = {
  displayName: "Einstein",
  id: "123-Ibr-ahi-man-290",
  contacts: [
    {
      id: "pri-mar-yco-nta-ct1",
      address: {
        addressLine1: "Parcelles Assainies, U.11",
        addressLine2: "Coté Hopital Mame Abdou Aziz  Dabakh",
        city: "Dakar",
        country: "Senegal",
        postalCode: "00000",
      },
      email: "primary@contact.com",
      firstName: "Albert",
      lastName: "Einstein",
      phoneNumber: "774657678",
      imageUrl:
        "https://images.pexels.com/photos/4559592/pexels-photo-4559592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
};

// {
//   displayName: "Einstein",
//   id: "123-Ibr-ahi-man-290",
//   primaryContact: "pri-mar-yco-nta-ct1",
//   inProgress: [
//     {
//       id: "transaction-progress-id-1",
//       initiatedOn: "20221010",
//       completedOn: "99991231",
//       totalDue: "450",
//       totalReceived: "0",
//       currency: "USD",
//       debitor: "loggedInPerson",
//       debited: "123-Ibr-ahi-man-290",
//       itemsPurchased: [
//         {
//           id: "item-one-id1",
//           name: "Ciment Sococim",
//           unitPurchased: "10",
//           unitPrice: "30",
//           totalToReceive: "300",
//           totalReceived: "0",
//         },
//         {
//           id: "item-two-id1",
//           name: "Verni Fond",
//           unitPurchased: "3",
//           unitPrice: "50",
//           totalToReceive: "150",
//           totalReceived: "0",
//         },
//       ],
//     },
//   ],
//   completed: [
//     {
//       id: "transaction-done-id-1",
//       initiatedOn: "20221010",
//       completedOn: "99991231",
//       totalDue: "0",
//       totalReceived: "450",
//       currency: "USD",
//       debitor: "loggedInPerson",
//       debited: "123-Ibr-ahi-man-290",
//       itemsPurchased: [
//         {
//           id: "item-one-id1",
//           name: "Ciment Sococim",
//           unitPurchased: "10",
//           unitPrice: "30",
//           totalToReceive: "300",
//           totalReceived: "300",
//         },
//         {
//           id: "item-two-id1",
//           name: "Verni Fond",
//           unitPurchased: "3",
//           unitPrice: "50",
//           totalToReceive: "150",
//           totalReceived: "150",
//         },
//       ],
//     },
//   ],
//   draft: [],
// };
