import { Clients } from "../types/clients";

export const initialClientsVar: Clients = {
  allClients: [],
};

export const clientInitialValue = {
  _id: "dhsd-48dj-aoqp-1092-xbn99",
  username: "",
  clientContacts: [],
  billings: {
    currency: "",
    preferredPayment: "", // [WAVE, OM, Bank]
  },
  address: {
    addresseLine1: "",
    addressLine2: "",
    postalCode: "",
  },
};

export const clientProfileInitialNavValue = "CLIENT_OVERVIEW";
