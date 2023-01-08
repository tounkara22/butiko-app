import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";
import axios from "axios";
import { getSession } from "next-auth/react";

const createConfig = async () => {
  const session = await getSession();
  if (session) {
    return {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user?.image}`,
      },
    };
  }
  return {
    headers: {
      Accept: "application/json",
    },
  };
};

export const apiHelper = async <T = any, U = any>(
  url: string,
  method: string,
  data = {},
  config = {}
): Promise<ResponseType<T | U>> => {
  const defaultConfig = await createConfig();

  const params =
    method === "GET"
      ? { method, ...defaultConfig, ...config }
      : { method, ...defaultConfig, ...config, data };
  try {
    const response = await axios(url, params);
    if (response.data || response.statusText || response.status) {
      return {
        isSuccess: true,
        data: response?.data || response,
        headers: response?.headers,
      } as ResponseType<T>;
    }
  } catch (error: any) {
    throw error?.response?.data?.error || {};
  }
  return {
    isSuccess: false,
    data: {},
  } as ResponseType<U>;
};
