import { InMemoryCache } from "@apollo/client";
import { copyVar, clientsVar } from "./globalVars";

export const appState = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        copy: () => copyVar(),
        clients: () => clientsVar(),
      },
    },
  },
});
