import { IUserResponse } from "../../types/api-responses/user";
import { apiHelper } from "../apiHelper/apiHelper";
import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";
import { ApiMethod } from "../clients/type";
import { endpoints } from "../endpoints";
import { ActivatePayload, LoginPayload, SignupPayload } from "./type";

const { loginUrl, signupUrl, activateUrl } = endpoints;

export const postLogin: (payload: LoginPayload) => Promise<ResponseType<IUserResponse>> = async (payload) => {
  return apiHelper(loginUrl, ApiMethod.POST, payload);
};

export const postSignup: (payload: SignupPayload) => Promise<ResponseType<IUserResponse>> = async (payload) => {
  return apiHelper(signupUrl, ApiMethod.POST, payload);
};

export const postActivateAccount: (payload: ActivatePayload) => Promise<ResponseType<any>> = async (payload) => {
  return apiHelper(activateUrl, ApiMethod.POST, payload);
};
