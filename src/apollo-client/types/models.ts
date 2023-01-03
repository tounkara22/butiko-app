import { ReactiveVar } from "@apollo/client";
import { ILoginVar } from "./auth";

export type ModelTypes = ILoginVar | any;

export type ApolloModelVars = ReactiveVar<ModelTypes>;
