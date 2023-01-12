import { ReactiveVar } from "@apollo/client";
import { ILoginVar, ISignupVar } from "./auth";

export type ModelTypes = ILoginVar | ISignupVar | any;

export type ApolloModelVars = ReactiveVar<ModelTypes>;
