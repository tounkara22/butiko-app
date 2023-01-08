import { InMemoryCache } from "@apollo/client";
import { copyVar, clientsVar, UserVar } from "./globalVars";

export const appState = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        copy: () => copyVar(),
        user: () => UserVar(),
        clients: () => clientsVar(),
      },
    },
  },
});
