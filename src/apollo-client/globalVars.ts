import { makeVar } from "@apollo/client";
import { loginInit } from "./initialValues/auth";
import {
  clientProfileInitialNavValue,
  initialClientsVar,
} from "./initialValues/client";
import { ILoginVar } from "./types/auth";
import { Clients } from "./types/clients";

export const copyVar = makeVar({});

export const clientsVar = makeVar<Clients>(initialClientsVar);

export const setClientProfileTab = makeVar(clientProfileInitialNavValue);

export const LoginVar = makeVar<ILoginVar>(loginInit);
