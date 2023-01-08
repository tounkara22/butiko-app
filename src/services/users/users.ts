import { IUserResponse } from "../../types/responses/user";
import { apiHelper } from "../apiHelper/apiHelper";
import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";
import { ApiMethod } from "../clients/type";
import { endpoints } from "../endpoints";

const { fetchUserUrl } = endpoints;

export const postUser: (
  userid: string
) => Promise<ResponseType<IUserResponse>> = async (userid) => {
  const payload = { userid };
  return apiHelper(fetchUserUrl, ApiMethod.POST, payload);
};
