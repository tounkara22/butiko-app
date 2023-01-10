import { ApolloClient } from "@apollo/client";
import { appState } from "./appState";

export const client = new ApolloClient({ cache: appState });
