import { ApolloClient } from "@apollo/client";
import { appState } from "./appSate";

export const client = new ApolloClient({ cache: appState });
